'use client'

import { useState } from 'react'
import { 
  Button, 
  Input, 
  GlowingCard, 
  Heading, 
  TechLabel, 
  Text, 
  BentoGrid, 
  BentoCard, 
  Section,
  SearchInput,
  Toggle,
  ToastProvider,
  useToast,
  Loading,
  Skeleton
} from '@/components/ui'
import { Search, Heart, Code, Zap } from 'lucide-react'

function TestComponentsContent() {
  const [searchValue, setSearchValue] = useState('')
  const [toggleState, setToggleState] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const { addToast } = useToast()

  const showToast = () => {
    addToast({
      title: 'Success!',
      description: 'This is a test toast notification.',
      type: 'success'
    })
  }

  return (
    <div className="bg-system min-h-screen">
      {/* Floating Blobs */}
      <div className="floating-blob blob-1" />
      <div className="floating-blob blob-2" />
      <div className="floating-blob blob-3" />

      <Section spacing="lg">
        <div className="text-center space-y-6 mb-12">
          <Heading as="h1" size="2xl" variant="gradient">
            UI Components Test Page
          </Heading>
          <Text variant="muted" size="lg">
            Testing all Phase 2 UI components with cyberpunk aesthetics
          </Text>
        </div>

        {/* Button Variants */}
        <GlowingCard className="p-8 mb-8">
          <TechLabel>Button System</TechLabel>
          <div className="flex flex-wrap gap-4 mt-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="neon">Neon Button</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button loading>Loading...</Button>
          </div>
        </GlowingCard>

        {/* Input System */}
        <GlowingCard className="p-8 mb-8">
          <TechLabel>Input System</TechLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <Input
              label="Standard Input"
              placeholder="Enter some text..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Input
              label="Input with Icon"
              placeholder="Search..."
              icon={<Search size={16} />}
            />
            <Input
              label="Password Input"
              type="password"
              placeholder="Password..."
              showPasswordToggle
            />
            <SearchInput
              placeholder="Search dorks..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onClear={() => setSearchValue('')}
            />
          </div>
        </GlowingCard>

        {/* Bento Grid System */}
        <div className="mb-8">
          <TechLabel className="mb-4">Bento Grid Layout</TechLabel>
          <BentoGrid>
            <BentoCard>
              <div className="space-y-3">
                <Heart className="text-neon-green" size={24} />
                <Heading size="md">Feature One</Heading>
                <Text variant="muted">
                  This is a standard bento card with some content.
                </Text>
              </div>
            </BentoCard>

            <BentoCard span={2}>
              <div className="space-y-3">
                <Code className="text-accent" size={24} />
                <Heading size="md">Wide Feature</Heading>
                <Text variant="muted">
                  This card spans 2 columns on desktop, showcasing the responsive grid system.
                </Text>
              </div>
            </BentoCard>

            <BentoCard>
              <div className="space-y-3">
                <Zap className="text-yellow-400" size={24} />
                <Heading size="md">Feature Three</Heading>
                <Text variant="muted">
                  Another standard card with cyberpunk styling.
                </Text>
              </div>
            </BentoCard>
          </BentoGrid>
        </div>

        {/* Interactive Components */}
        <GlowingCard className="p-8 mb-8">
          <TechLabel>Interactive Components</TechLabel>
          <div className="space-y-6 mt-4">
            <div className="flex items-center gap-6">
              <Toggle
                checked={toggleState}
                onCheckedChange={setToggleState}
                label="Dark Mode"
                description="Enable dark theme"
              />
              <Button onClick={showToast} variant="neon">
                Show Toast
              </Button>
            </div>
          </div>
        </GlowingCard>

        {/* Loading States */}
        <GlowingCard className="p-8 mb-8">
          <TechLabel>Loading States</TechLabel>
          <div className="space-y-4 mt-4">
            <div className="flex items-center gap-4">
              <Loading size="sm" />
              <Loading size="md" />
              <Loading size="lg" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-8 w-full" />
            </div>
          </div>
        </GlowingCard>

        {/* Typography Scale */}
        <GlowingCard className="p-8">
          <TechLabel>Typography System</TechLabel>
          <div className="space-y-4 mt-4">
            <Heading size="3xl" variant="gradient">3XL Gradient Heading</Heading>
            <Heading size="2xl" variant="neon">2XL Neon Heading</Heading>
            <Heading size="xl" variant="glow">XL Glow Heading</Heading>
            <Heading size="lg" variant="default">LG Default Heading</Heading>
            <Text size="lg">Large body text for important content</Text>
            <Text size="base">Base body text for regular content</Text>
            <Text size="sm" variant="muted">Small muted text for captions</Text>
          </div>
        </GlowingCard>
      </Section>
    </div>
  )
}

export default function TestComponents() {
  return (
    <ToastProvider>
      <TestComponentsContent />
    </ToastProvider>
  )
}