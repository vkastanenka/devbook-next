'use client'

// components
import { UserDetails } from '@/components/primitives/user-details'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

import { Paperclip, SmilePlus } from 'lucide-react'

// utils
// import axios from 'axios'
import { useModal } from '@/hooks/use-modal-store'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  text: z.string().min(1, {
    message: 'Post text is required.',
  }),
})

export const CreatePostModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const { user } = data

  const isModalOpen = isOpen && type === 'createPost'

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values)
      //   await axios.post('/api/servers', values)

      //   form.reset()
      //   router.refresh()
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  const handleClose = () => {
    form.reset()
    onClose()
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-card">
        {user && (
          <DialogHeader>
            <UserDetails user={user} />
          </DialogHeader>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="border-[1px] border-border bg-input hover:border-purple-400 focus-within:border-purple-400 rounded-[6px] flex flex-col gap-2">
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        placeholder="What's on your mind, Victoria?"
                        className="bg-transparent border-transparent"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="inline-flex items-center text-slate-400 px-3 pb-2 gap-2">
                <button className="hover:text-purple-400 focus:text-purple-400">
                  <SmilePlus />
                </button>
                <button className="hover:text-purple-400 focus:text-purple-400">
                  <Paperclip />
                </button>
              </div>
            </div>
            <DialogFooter>
              <Button disabled={isLoading} className="w-full">
                Create Post
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
