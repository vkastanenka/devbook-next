'use client'

// components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

import { Paperclip, SendHorizonal, SmilePlus } from 'lucide-react'

// utils
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const FormSchema = z.object({
  bio: z
    .string()
    .min(10, {
      message: 'Bio must be at least 10 characters.',
    })
    .max(160, {
      message: 'Bio must not be longer than 30 characters.',
    }),
})

export const CommentForm = () => {
  return (
    <div className="basis-full border-[1px] bg-slate-800 border-slate-400 rounded-[6px] flex flex-col gap-2">
      <Textarea
        placeholder="Leave a comment!"
        className="resize-none bg-transparent border-transparent"
      ></Textarea>
      <div className="w-full flex justify-between text-slate-400 px-3 pb-2">
        <div className="inline-flex items-center gap-4">
          <button>
            <SmilePlus />
          </button>
          <button>
            <Paperclip />
          </button>
        </div>
        <button>
          <SendHorizonal />
        </button>
      </div>
    </div>
  )
}
