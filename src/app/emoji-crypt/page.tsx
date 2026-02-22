'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Lock, Unlock, Shield, ArrowLeft, KeyRound, Shuffle, Copy, RotateCcw } from 'lucide-react'
import { Section } from '@/components/ui/section'
import { GlowingCard } from '@/components/ui/glowing-card'
import { Heading, Text, TechLabel } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'

const BASE_EMO = [...'😀😁😂🤣😃😄😅😆😉😊😋😎😍😘🥰😗']
const textEncoder = new TextEncoder()
const textDecoder = new TextDecoder()

function buildMaps(emojiArr: string[]) {
  const encMap = new Map<number, string>()
  const decMap = new Map<string, number>()
  emojiArr.forEach((emoji, index) => {
    encMap.set(index, emoji)
    decMap.set(emoji, index)
  })
  return { encMap, decMap }
}

function xmur3(str: string) {
  let h = 1779033703 ^ str.length
  for (let i = 0; i < str.length; i += 1) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507)
    h = Math.imul(h ^ (h >>> 13), 3266489909)
    return (h ^= h >>> 16) >>> 0
  }
}

function mulberry32(a: number) {
  return () => {
    let t = (a += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function seededShuffle(array: string[], passphrase: string) {
  const seed = xmur3(passphrase)()
  const random = mulberry32(seed)
  const out = array.slice()
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

function emojiEncode(text: string, emojiArr: string[]) {
  const { encMap } = buildMaps(emojiArr)
  const bytes = Array.from(textEncoder.encode(text))
  return bytes.map((byte) => encMap.get(byte >> 4)! + encMap.get(byte & 15)!).join('')
}

function emojiDecode(emojiStr: string, emojiArr: string[]) {
  const { decMap } = buildMaps(emojiArr)
  const chars = [...emojiStr]
  if (chars.length % 2 !== 0) {
    throw new Error('Emoji length must be even.')
  }
  const out = new Uint8Array(chars.length / 2)
  for (let i = 0, j = 0; i < chars.length; i += 2, j += 1) {
    const high = decMap.get(chars[i])
    const low = decMap.get(chars[i + 1])
    if (high === undefined || low === undefined) {
      throw new Error('Unknown emoji encountered in payload.')
    }
    out[j] = (high << 4) | low
  }
  return textDecoder.decode(out)
}

async function deriveKeyFromPassword(password: string, salt: Uint8Array) {
  const pwUtf8 = textEncoder.encode(password)
  const saltBuffer = Uint8Array.from(salt).buffer
  const baseKey = await crypto.subtle.importKey('raw', pwUtf8, { name: 'PBKDF2' }, false, [
    'deriveKey',
  ])
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: saltBuffer, iterations: 100_000, hash: 'SHA-256' },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  )
}

async function aesEncrypt(plaintext: string, password: string) {
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const key = await deriveKeyFromPassword(password, salt)
  const ct = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    textEncoder.encode(plaintext)
  )
  const buf = new Uint8Array(salt.byteLength + iv.byteLength + ct.byteLength)
  buf.set(salt, 0)
  buf.set(iv, salt.byteLength)
  buf.set(new Uint8Array(ct), salt.byteLength + iv.byteLength)
  return btoa(String.fromCharCode(...buf))
}

async function aesDecrypt(payload: string, password: string) {
  const raw = Uint8Array.from(atob(payload), (c) => c.charCodeAt(0))
  const salt = raw.slice(0, 16)
  const iv = raw.slice(16, 28)
  const ct = raw.slice(28)
  const key = await deriveKeyFromPassword(password, salt)
  const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct)
  return textDecoder.decode(pt)
}

export default function EmojiCryptPage() {
  const [plainText, setPlainText] = useState('')
  const [emojiText, setEmojiText] = useState('')
  const [passphrase, setPassphrase] = useState('')
  const [aesPassword, setAesPassword] = useState('')
  const [aesPayload, setAesPayload] = useState('')
  const [status, setStatus] = useState('')

  const emojiSet = useMemo(
    () => (passphrase ? seededShuffle(BASE_EMO, passphrase) : BASE_EMO.slice()),
    [passphrase]
  )

  const handleEncode = () => {
    if (!plainText.trim()) {
      setStatus('Enter text to encode.')
      return
    }
    try {
      const encoded = emojiEncode(plainText, emojiSet)
      setEmojiText(encoded)
      setStatus('Text encoded into emojis.')
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Failed to encode.')
    }
  }

  const handleDecode = () => {
    if (!emojiText.trim()) {
      setStatus('Paste emoji payload to decode.')
      return
    }
    try {
      const decoded = emojiDecode(emojiText.trim(), emojiSet)
      setPlainText(decoded)
      setStatus('Emoji payload decoded to text.')
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Failed to decode.')
    }
  }

  const handleSwap = () => {
    setPlainText(emojiText)
    setEmojiText(plainText)
    setStatus('Inputs swapped.')
  }

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setStatus('Copied to clipboard.')
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Failed to copy.')
    }
  }

  const handleEncrypt = async () => {
    if (!plainText.trim()) {
      setStatus('Enter text to encrypt.')
      return
    }
    if (!aesPassword) {
      setStatus('Enter AES password to encrypt.')
      return
    }
    try {
      const encoded = emojiEncode(plainText, emojiSet)
      const encrypted = await aesEncrypt(encoded, aesPassword)
      setAesPayload(`AESv1:${encrypted}`)
      setStatus('Encrypted and encoded payload ready.')
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Failed to encrypt.')
    }
  }

  const handleDecrypt = async () => {
    if (!aesPayload.trim()) {
      setStatus('Paste AES payload to decrypt.')
      return
    }
    if (!aesPassword) {
      setStatus('Enter AES password to decrypt.')
      return
    }
    try {
      if (!aesPayload.startsWith('AESv1:')) {
        throw new Error('Payload must start with AESv1:')
      }
      const decrypted = await aesDecrypt(aesPayload.slice(6), aesPassword)
      const decoded = emojiDecode(decrypted, emojiSet)
      setPlainText(decoded)
      setStatus('AES payload decrypted and decoded.')
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Failed to decrypt.')
    }
  }

  const handleReset = () => {
    setPlainText('')
    setEmojiText('')
    setAesPayload('')
    setStatus('Fields cleared.')
  }

  return (
    <div className="min-h-screen">
      <Section className="pt-32 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-4"
            >
              <TechLabel>EMOCRYPT LIVE</TechLabel>
              <Heading size="2xl" className="gradient-text">
                Emoji Obfuscator + AES Wrap
              </Heading>
              <Text variant="muted" className="text-lg max-w-3xl mx-auto">
                Encode text into emojis using nibble mapping with optional deterministic shuffling
                and AES-GCM wrapping.
              </Text>
            </motion.div>
            {status ? (
              <div className="mx-auto max-w-3xl text-center">
                <Text size="sm" className="text-neon-green font-mono">
                  {status}
                </Text>
              </div>
            ) : null}
          </div>
        </div>
      </Section>

      <Section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">
            <GlowingCard className="p-6 space-y-6">
              <div className="flex items-center gap-3">
                <Lock size={20} className="text-neon-green" />
                <Text className="font-semibold">Encode / Decode</Text>
              </div>
              <div className="space-y-2">
                <Text size="sm" variant="muted">
                  Plain text
                </Text>
                <textarea
                  className="w-full min-h-[140px] rounded-xl bg-black/60 border border-white/10 p-3 text-sm text-white"
                  value={plainText}
                  onChange={(event) => setPlainText(event.target.value)}
                  placeholder="Type text to encode"
                />
              </div>
              <div className="space-y-2">
                <Text size="sm" variant="muted">
                  Emoji payload
                </Text>
                <textarea
                  className="w-full min-h-[140px] rounded-xl bg-black/60 border border-white/10 p-3 text-sm text-white"
                  value={emojiText}
                  onChange={(event) => setEmojiText(event.target.value)}
                  placeholder="Paste encoded emoji payload"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="sm" onClick={handleEncode}>
                  Encode
                </Button>
                <Button variant="secondary" size="sm" onClick={handleDecode}>
                  Decode
                </Button>
                <Button variant="ghost" size="sm" onClick={handleSwap}>
                  <Shuffle size={16} className="mr-2" />
                  Swap
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleCopy(emojiText)}>
                  <Copy size={16} className="mr-2" />
                  Copy emojis
                </Button>
                <Button variant="ghost" size="sm" onClick={handleReset}>
                  <RotateCcw size={16} className="mr-2" />
                  Clear
                </Button>
              </div>
            </GlowingCard>

            <GlowingCard className="p-6 space-y-6">
              <div className="flex items-center gap-3">
                <KeyRound size={20} className="text-neon-green" />
                <Text className="font-semibold">Passphrase + AES</Text>
              </div>
              <div className="space-y-2">
                <Text size="sm" variant="muted">
                  Shuffle passphrase (optional)
                </Text>
                <input
                  className="w-full rounded-xl bg-black/60 border border-white/10 p-3 text-sm text-white"
                  value={passphrase}
                  onChange={(event) => setPassphrase(event.target.value)}
                  placeholder="Same passphrase must be used to decode"
                />
              </div>
              <div className="space-y-2">
                <Text size="sm" variant="muted">
                  AES password (optional)
                </Text>
                <input
                  className="w-full rounded-xl bg-black/60 border border-white/10 p-3 text-sm text-white"
                  type="password"
                  value={aesPassword}
                  onChange={(event) => setAesPassword(event.target.value)}
                  placeholder="Required for AES encrypt/decrypt"
                />
              </div>
              <div className="space-y-2">
                <Text size="sm" variant="muted">
                  AES payload
                </Text>
                <textarea
                  className="w-full min-h-[120px] rounded-xl bg-black/60 border border-white/10 p-3 text-sm text-white"
                  value={aesPayload}
                  onChange={(event) => setAesPayload(event.target.value)}
                  placeholder="AESv1: payload appears here"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="sm" onClick={handleEncrypt}>
                  Encrypt + Encode
                </Button>
                <Button variant="secondary" size="sm" onClick={handleDecrypt}>
                  Decrypt + Decode
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleCopy(aesPayload)}>
                  <Copy size={16} className="mr-2" />
                  Copy AES
                </Button>
              </div>
              <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4">
                <div className="flex items-start gap-3">
                  <Shield size={18} className="text-yellow-400 mt-0.5" />
                  <Text size="sm" variant="muted">
                    Emoji encoding is obfuscation. Use AES wrapping for actual security and share
                    the AES password over a separate channel.
                  </Text>
                </div>
              </div>
            </GlowingCard>
          </div>
        </div>
      </Section>

      <Section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6 text-center">
            <TechLabel>QUICK REF</TechLabel>
            <Heading size="lg">Nibble Mapping + Deterministic Shuffle</Heading>
            <Text variant="muted">
              Each byte becomes two emojis (high/low nibble). Add a passphrase to shuffle the emoji
              mapping deterministically.
            </Text>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link href="/">
                <Button variant="primary" size="lg">
                  <ArrowLeft size={18} className="mr-2" />
                  Dork Generator
                </Button>
              </Link>
              <Link href="/academy">
                <Button variant="secondary" size="lg">
                  OSINT Academy
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
