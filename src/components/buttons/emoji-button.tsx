'use client'

// components
import Picker from '@emoji-mart/react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/src/components/ui/popover'

// svg
import { SmilePlus } from 'lucide-react'

// utils
import data from '@emoji-mart/data'
import { useTheme } from 'next-themes'

// types
import { Skin } from '@emoji-mart/data'

interface EmojiButton {
  onChange: (value: string) => void
}

export const EmojiButton = ({ onChange }: EmojiButton) => {
  const { resolvedTheme } = useTheme()

  return (
    <Popover>
      <PopoverTrigger className="button-text">
        <SmilePlus className="text-foreground" />
      </PopoverTrigger>
      <PopoverContent
        className="bg-transparent border-none shadow-none drop-shadow-none mb-16"
        side="right"
        sideOffset={40}
      >
        <Picker
          data={data}
          onEmojiSelect={(emoji: Skin) => onChange(emoji.native)}
          theme={resolvedTheme}
        />
      </PopoverContent>
    </Popover>
  )
}
