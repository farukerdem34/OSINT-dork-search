'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Image, AlertCircle, Download, Copy, MapPin } from 'lucide-react'
import { Section } from '@/components/ui/section'
import { GlowingCard } from '@/components/ui/glowing-card'
import { Heading, Text, TechLabel } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'

interface ExifData {
  [key: string]: any
}

interface GpsCoordinates {
  latitude?: number
  longitude?: number
  altitude?: number
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

const getExifTagName = (tag: number): string => {
  const tags: { [key: number]: string } = {
    // IFD0 Tags
    0x010f: 'Make',
    0x0110: 'Model',
    0x0112: 'Orientation',
    0x0131: 'Software',
    0x0132: 'DateTime',
    0x0100: 'ImageWidth',
    0x0101: 'ImageLength',
    0x0102: 'BitsPerSample',
    0x0103: 'Compression',
    0x0106: 'PhotometricInterpretation',
    // EXIF SubIFD Tags
    0x8822: 'ExposureProgram',
    0x8827: 'ISOSpeedRatings',
    0x9000: 'ExifVersion',
    0x9003: 'DateTimeOriginal',
    0x9004: 'DateTimeDigitized',
    0x9201: 'ShutterSpeedValue',
    0x9202: 'ApertureValue',
    0x9203: 'BrightnessValue',
    0x9204: 'ExposureBiasValue',
    0x9205: 'MaxAperture',
    0x9207: 'MeteringMode',
    0x9209: 'Flash',
    0x920a: 'FocalLength',
    0xa000: 'FlashPixVersion',
    0xa001: 'ColorSpace',
    0xa002: 'ExifImageWidth',
    0xa003: 'ExifImageHeight',
    0xa20e: 'FocalPlaneXResolution',
    0xa20f: 'FocalPlaneYResolution',
    0xa210: 'FocalPlaneResolutionUnit',
    0xa401: 'CustomRendered',
    0xa402: 'ExposureMode',
    0xa403: 'WhiteBalance',
    0xa404: 'DigitalZoomRatio',
    0xa405: 'FocalLengthIn35mm',
    0xa406: 'SceneCaptureType',
    // GPS Tags (usually in a separate IFD)
    0x0001: 'GPSLatitudeRef',
    0x0002: 'GPSLatitude',
    0x0003: 'GPSLongitudeRef',
    0x0004: 'GPSLongitude',
    0x0005: 'GPSAltitudeRef',
    0x0006: 'GPSAltitude',
  }
  return tags[tag] || `Unknown (0x${tag.toString(16).toUpperCase()})`
}

const extractBasicExifFromJPEG = (arrayBuffer: ArrayBuffer): ExifData => {
  try {
    const view = new DataView(arrayBuffer)
    const exifData: ExifData = {}

    // Check for JPEG SOI marker (0xFFD8)
    if (view.getUint16(0) !== 0xffd8) {
      return {}
    }

    let offset = 2
    while (offset < arrayBuffer.byteLength) {
      const marker = view.getUint16(offset)

      // Look for APP1 marker (0xFFE1) which contains EXIF
      if (marker === 0xffe1) {
        offset += 2
        const segmentLength = view.getUint16(offset)
        offset += 2

        // Check for EXIF identifier "Exif\0\0"
        const exifIdentifier = String.fromCharCode(
          view.getUint8(offset),
          view.getUint8(offset + 1),
          view.getUint8(offset + 2),
          view.getUint8(offset + 3)
        )

        if (exifIdentifier === 'Exif') {
          // Skip 2 null bytes
          offset += 6

          // Read byte order (little endian or big endian)
          const littleEndian = view.getUint16(offset) === 0x4949
          offset += 2

          // Check TIFF magic number 0x002A
          if (view.getUint16(offset, littleEndian) === 0x002a) {
            offset += 2

            // Read offset to first IFD
            const ifdOffset = view.getUint32(offset, littleEndian)
            const ifdStart = offset - 4 + ifdOffset

            // Parse IFD0
            parseIFDData(view, ifdStart, littleEndian, exifData)

            return exifData
          }
        }
        return {}
      } else if ((marker & 0xff00) === 0xff00) {
        // Skip to next marker
        offset += 2
        const length = view.getUint16(offset)
        offset += length
      } else {
        break
      }
    }

    return {}
  } catch (error) {
    console.error('Error extracting EXIF:', error)
    return {}
  }
}

const extractGPSFromJPEG = (arrayBuffer: ArrayBuffer): GpsCoordinates => {
  try {
    const view = new DataView(arrayBuffer)
    const gpsCoords: GpsCoordinates = {}

    // Check for JPEG SOI marker (0xFFD8)
    if (view.getUint16(0) !== 0xffd8) {
      return {}
    }

    let offset = 2
    while (offset < arrayBuffer.byteLength) {
      const marker = view.getUint16(offset)

      // Look for APP1 marker (0xFFE1)
      if (marker === 0xffe1) {
        offset += 2
        const segmentLength = view.getUint16(offset)
        offset += 2

        // Check for EXIF identifier
        const exifIdentifier = String.fromCharCode(
          view.getUint8(offset),
          view.getUint8(offset + 1),
          view.getUint8(offset + 2),
          view.getUint8(offset + 3)
        )

        if (exifIdentifier === 'Exif') {
          offset += 6
          const littleEndian = view.getUint16(offset) === 0x4949
          offset += 2

          if (view.getUint16(offset, littleEndian) === 0x002a) {
            offset += 2
            const ifdOffset = view.getUint32(offset, littleEndian)
            const ifdStart = offset - 4 + ifdOffset

            // Parse IFD0 to find GPS IFD pointer
            const gpsIfdOffset = findGPSIFDOffset(view, ifdStart, littleEndian)

            if (gpsIfdOffset !== null) {
              parseGPSIFD(view, gpsIfdOffset, littleEndian, gpsCoords)
            }
          }
        }
        return gpsCoords
      } else if ((marker & 0xff00) === 0xff00) {
        offset += 2
        const length = view.getUint16(offset)
        offset += length
      } else {
        break
      }
    }

    return gpsCoords
  } catch (error) {
    console.error('Error extracting GPS:', error)
    return {}
  }
}

const findGPSIFDOffset = (
  view: DataView,
  ifdOffset: number,
  littleEndian: boolean
): number | null => {
  try {
    const numEntries = view.getUint16(ifdOffset, littleEndian)

    for (let i = 0; i < numEntries; i++) {
      const entryOffset = ifdOffset + 2 + i * 12
      const tag = view.getUint16(entryOffset, littleEndian)

      // Tag 0x8825 is the GPS IFD Pointer
      if (tag === 0x8825) {
        const gpsIfdOffset = view.getUint32(entryOffset + 8, littleEndian)
        return ifdOffset - 8 + gpsIfdOffset
      }
    }

    return null
  } catch (error) {
    return null
  }
}

const parseGPSIFD = (
  view: DataView,
  offset: number,
  littleEndian: boolean,
  gpsCoords: GpsCoordinates
) => {
  try {
    const numEntries = view.getUint16(offset, littleEndian)
    offset += 2

    const gpsLatRef = { value: 'N' }
    const gpsLatitude = { value: [] as number[] }
    const gpsLonRef = { value: 'E' }
    const gpsLongitude = { value: [] as number[] }

    for (let i = 0; i < numEntries; i++) {
      const entryOffset = offset + i * 12
      const tag = view.getUint16(entryOffset, littleEndian)
      const type = view.getUint16(entryOffset + 2, littleEndian)
      const count = view.getUint32(entryOffset + 4, littleEndian)
      const valueOffset = entryOffset + 8

      try {
        if (tag === 0x0001) {
          // GPSLatitudeRef
          gpsLatRef.value = String.fromCharCode(view.getUint8(valueOffset))
        } else if (tag === 0x0002 && type === 5) {
          // GPSLatitude (RATIONAL)
          const values = []
          for (let j = 0; j < Math.min(3, count); j++) {
            const num = view.getUint32(valueOffset + j * 8, littleEndian)
            const denom = view.getUint32(valueOffset + j * 8 + 4, littleEndian)
            values.push(denom !== 0 ? num / denom : 0)
          }
          gpsLatitude.value = values
        } else if (tag === 0x0003) {
          // GPSLongitudeRef
          gpsLonRef.value = String.fromCharCode(view.getUint8(valueOffset))
        } else if (tag === 0x0004 && type === 5) {
          // GPSLongitude (RATIONAL)
          const values = []
          for (let j = 0; j < Math.min(3, count); j++) {
            const num = view.getUint32(valueOffset + j * 8, littleEndian)
            const denom = view.getUint32(valueOffset + j * 8 + 4, littleEndian)
            values.push(denom !== 0 ? num / denom : 0)
          }
          gpsLongitude.value = values
        } else if (tag === 0x0006 && type === 5) {
          // GPSAltitude
          const num = view.getUint32(valueOffset, littleEndian)
          const denom = view.getUint32(valueOffset + 4, littleEndian)
          if (denom !== 0) {
            gpsCoords.altitude = num / denom
          }
        }
      } catch (e) {
        // Skip on error
      }
    }

    // Calculate latitude
    if (gpsLatitude.value.length >= 3) {
      const degrees = gpsLatitude.value[0]
      const minutes = gpsLatitude.value[1]
      const seconds = gpsLatitude.value[2]
      let lat = degrees + minutes / 60 + seconds / 3600
      if (gpsLatRef.value === 'S') lat = -lat
      gpsCoords.latitude = lat
    }

    // Calculate longitude
    if (gpsLongitude.value.length >= 3) {
      const degrees = gpsLongitude.value[0]
      const minutes = gpsLongitude.value[1]
      const seconds = gpsLongitude.value[2]
      let lon = degrees + minutes / 60 + seconds / 3600
      if (gpsLonRef.value === 'W') lon = -lon
      gpsCoords.longitude = lon
    }
  } catch (error) {
    console.error('Error parsing GPS IFD:', error)
  }
}

const parseIFDData = (
  view: DataView,
  offset: number,
  littleEndian: boolean,
  exifData: ExifData
) => {
  try {
    const numEntries = view.getUint16(offset, littleEndian)
    offset += 2

    for (let i = 0; i < numEntries && i < 200; i++) {
      const entryOffset = offset + i * 12
      const tag = view.getUint16(entryOffset, littleEndian)
      const type = view.getUint16(entryOffset + 2, littleEndian)
      const count = view.getUint32(entryOffset + 4, littleEndian)
      const valueOffset = entryOffset + 8

      const tagName = getExifTagName(tag)

      try {
        let value: any = null

        if (type === 2) {
          // ASCII String
          const bytes = new Uint8Array(view.buffer, valueOffset, Math.min(count, 4))
          value = String.fromCharCode(...bytes).split('\0')[0]
        } else if (type === 3) {
          // SHORT (16-bit unsigned)
          value = view.getUint16(valueOffset, littleEndian)
        } else if (type === 4) {
          // LONG (32-bit unsigned)
          value = view.getUint32(valueOffset, littleEndian)
        } else if (type === 5) {
          // RATIONAL
          const num = view.getUint32(valueOffset, littleEndian)
          const denom = view.getUint32(valueOffset + 4, littleEndian)
          value = denom !== 0 ? (num / denom).toFixed(4) : 'N/A'
        } else if (type === 7) {
          // UNDEFINED (binary)
          value = `[Binary Data - ${count} bytes]`
        } else if (type === 10) {
          // SRATIONAL (signed rational)
          const num = view.getInt32(valueOffset, littleEndian)
          const denom = view.getInt32(valueOffset + 4, littleEndian)
          value = denom !== 0 ? (num / denom).toFixed(4) : 'N/A'
        }

        if (value !== null && value !== '') {
          exifData[tagName] = value
        }
      } catch (e) {
        // Skip this entry on error
      }
    }
  } catch (error) {
    console.error('Error parsing IFD:', error)
  }
}

export default function MetaExtractorPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')
  const [exifData, setExifData] = useState<ExifData>({})
  const [gpsCoordinates, setGpsCoordinates] = useState<GpsCoordinates | null>(null)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleFileSelect = (file: File) => {
    if (!file.type.match(/image\/(jpe?g|png|webp|gif)/i)) {
      alert('Please select a valid image file (JPG, PNG, WebP, GIF)')
      return
    }

    setSelectedFile(file)
    setLoading(true)
    setGpsCoordinates(null)

    const reader = new FileReader()
    reader.onload = (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer
      setPreview(URL.createObjectURL(file))

      // Load image to get dimensions
      const img = new window.Image()
      img.onload = () => {
        const basicData: ExifData = {
          'File Name': file.name,
          'File Size': formatFileSize(file.size),
          'File Type': file.type,
          'Image Width': img.naturalWidth + ' px',
          'Image Height': img.naturalHeight + ' px',
          'Last Modified': new Date(file.lastModified).toLocaleString(),
        }

        // Try to extract EXIF data for JPEG files
        if (file.type === 'image/jpeg') {
          const exifData = extractBasicExifFromJPEG(arrayBuffer)
          Object.assign(basicData, exifData)

          // Try to extract GPS coordinates
          const gpsData = extractGPSFromJPEG(arrayBuffer)
          if (gpsData.latitude !== undefined && gpsData.longitude !== undefined) {
            setGpsCoordinates(gpsData)
          }
        }

        setExifData(basicData)
        setLoading(false)
      }

      const objectUrl = URL.createObjectURL(file)
      img.src = objectUrl
    }

    reader.readAsArrayBuffer(file)
  }

  const exportAsJSON = () => {
    const dataStr = JSON.stringify(exifData, null, 2)
    downloadFile(dataStr, 'metadata.json', 'application/json')
  }

  const exportAsCSV = () => {
    let csv = 'Field,Value\n'
    for (const [key, value] of Object.entries(exifData)) {
      const escapedValue = String(value).includes(',') ? `"${value}"` : value
      csv += `${key},${escapedValue}\n`
    }
    downloadFile(csv, 'metadata.csv', 'text/csv')
  }

  const exportAsTXT = () => {
    let txt = 'EXIF Metadata Export\n'
    txt += '='.repeat(50) + '\n\n'
    for (const [key, value] of Object.entries(exifData)) {
      txt += `${key}: ${value}\n`
    }
    downloadFile(txt, 'metadata.txt', 'text/plain')
  }

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  const copyToClipboard = () => {
    const text = JSON.stringify(exifData, null, 2)
    navigator.clipboard.writeText(text).then(() => {
      alert('Metadata copied to clipboard!')
    })
  }

  const hasExifData = Object.keys(exifData).length > 0

  return (
    <div className="min-h-screen">
      <Section className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-4"
            >
              <TechLabel>METADATA EXTRACTION</TechLabel>
              <Heading size="2xl" className="gradient-text">
                EXIF Metadata Extractor
              </Heading>
              <Text variant="muted" className="text-lg">
                Extract detailed metadata from images including GPS coordinates, camera settings,
                and timestamps
              </Text>
            </motion.div>

            {/* Privacy Warning */}
            <GlowingCard className="p-6 border-amber-500/30 bg-amber-500/5">
              <div className="flex gap-4">
                <AlertCircle size={24} className="text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <Text className="font-semibold text-amber-400 mb-2">Privacy Alert</Text>
                  <Text size="sm" variant="muted">
                    Images often contain hidden metadata including GPS coordinates, camera details,
                    and timestamps. Always remove this data before sharing images publicly to
                    protect your privacy.
                  </Text>
                </div>
              </div>
            </GlowingCard>

            {/* Upload Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="relative cursor-pointer"
              >
                <GlowingCard className="p-12 border-2 border-dashed border-accent/30 hover:border-accent/60 transition-colors">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
                    className="hidden"
                  />
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="p-4 bg-accent/10 rounded-lg">
                        <Image size={32} className="text-accent" />
                      </div>
                    </div>
                    <div>
                      <Text className="font-semibold">Drag & drop your image here</Text>
                      <Text size="sm" variant="muted" className="mt-1">
                        or click to browse (JPG, PNG, WebP, GIF)
                      </Text>
                    </div>
                  </div>
                </GlowingCard>
              </div>
            </motion.div>

            {/* Loading State */}
            {loading && (
              <div className="text-center">
                <div className="inline-block">
                  <div className="animate-spin rounded-full h-12 w-12 border-2 border-accent border-t-transparent" />
                </div>
                <Text variant="muted" className="mt-4">
                  Analyzing metadata...
                </Text>
              </div>
            )}

            {/* Results */}
            {hasExifData && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* Preview & Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  {preview && (
                    <GlowingCard className="p-6">
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full rounded-lg border border-accent/20"
                      />
                    </GlowingCard>
                  )}
                  <div>
                    <GlowingCard className="p-6 h-full">
                      <Text className="font-semibold mb-4 text-accent">File Information</Text>
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {Object.entries(exifData).map(([key, value]) => (
                          <div key={key}>
                            <Text size="sm" className="text-text-dim font-semibold">
                              {key}
                            </Text>
                            <Text size="sm" className="font-mono text-accent break-words">
                              {String(value)}
                            </Text>
                          </div>
                        ))}
                      </div>
                    </GlowingCard>
                  </div>
                </div>

                {/* GPS Information - if available */}
                {gpsCoordinates && (gpsCoordinates.latitude || gpsCoordinates.longitude) && (
                  <GlowingCard className="p-6 border-green-500/30 bg-green-500/5">
                    <div className="flex gap-4">
                      <MapPin size={24} className="text-green-400 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <Text className="font-semibold text-green-400 mb-3">
                          GPS Location Found
                        </Text>
                        <div className="space-y-2">
                          {gpsCoordinates.latitude !== undefined && (
                            <div>
                              <Text size="sm" className="text-text-dim font-semibold">
                                Latitude
                              </Text>
                              <Text size="sm" className="font-mono text-accent">
                                {gpsCoordinates.latitude.toFixed(6)}°
                              </Text>
                            </div>
                          )}
                          {gpsCoordinates.longitude !== undefined && (
                            <div>
                              <Text size="sm" className="text-text-dim font-semibold">
                                Longitude
                              </Text>
                              <Text size="sm" className="font-mono text-accent">
                                {gpsCoordinates.longitude.toFixed(6)}°
                              </Text>
                            </div>
                          )}
                          {gpsCoordinates.altitude !== undefined && (
                            <div>
                              <Text size="sm" className="text-text-dim font-semibold">
                                Altitude
                              </Text>
                              <Text size="sm" className="font-mono text-accent">
                                {gpsCoordinates.altitude.toFixed(2)} m
                              </Text>
                            </div>
                          )}
                        </div>
                        <Text size="sm" variant="muted" className="mt-4">
                          ⚠️ This location data reveals where the photo was taken. Be careful when
                          sharing images with others.
                        </Text>
                      </div>
                    </div>
                  </GlowingCard>
                )}

                {/* Export Controls */}
                <div className="flex gap-3 flex-wrap">
                  <Button variant="primary" onClick={exportAsJSON}>
                    <Download size={18} className="mr-2" /> Export JSON
                  </Button>
                  <Button variant="primary" onClick={exportAsCSV}>
                    <Download size={18} className="mr-2" /> Export CSV
                  </Button>
                  <Button variant="primary" onClick={exportAsTXT}>
                    <Download size={18} className="mr-2" /> Export TXT
                  </Button>
                  <Button variant="secondary" onClick={copyToClipboard}>
                    <Copy size={18} className="mr-2" /> Copy Data
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Empty State */}
            {!hasExifData && !loading && selectedFile && (
              <GlowingCard className="p-6 text-center">
                <AlertCircle size={32} className="mx-auto mb-4 text-accent" />
                <Text className="font-semibold mb-2">No Metadata Found</Text>
                <Text size="sm" variant="muted">
                  This image file doesn't contain extractable EXIF metadata. For JPEGs with embedded
                  data (especially photos from cameras), more detailed information will be
                  displayed.
                </Text>
              </GlowingCard>
            )}
          </div>
        </div>
      </Section>
    </div>
  )
}
