'use client'

// components
import { EmojiButton } from '@/components/buttons/emoji-button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

// utils
import { updateUser } from '@/src/actions-old/user-actions'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { useModal } from '@/hooks/use-modal-store'

// types
import { Comment, Post } from '@/types/post-types'
import { PostFormData } from '@/types/form-types'
import { User } from '@/types/user-types'

// validation
import { postFormSchema } from '@/validation/post'

export const PostCommentForm: React.FC<{
  comment?: Comment
  post?: Post
  user: User
}> = ({ comment, post, user }) => {
  const router = useRouter()
  const { toast } = useToast()
  const { onClose } = useModal()

  const form = useForm({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      body: comment?.body || '',
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const action: () => void = handleSubmit(async (formData: PostFormData) => {
    // TODO: Update format
    const formattedReqBody = formatReqBody({ formData, post })

    // TODO: Update typescript
    const response = await updateUser(formattedReqBody, user)

    // If other error, show toast message
    if (!response.success && !response.errors) {
      toast({
        title: 'Error!',
        description: response.message,
        variant: 'destructive',
      })
    }

    // If successful, push to user feed
    if (response.success) {
      onClose()
      router.refresh()
      toast({
        title: 'Success!',
        description: response.message,
      })
    }
  })

  return (
    <Form {...form}>
      <form
        action={action}
        autoComplete="off"
        className="flex flex-col gap-4 justify-center"
      >
        <FormField
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Textarea
                  rows={10}
                  placeholder="Comment"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <EmojiButton
                onChange={(emoji: string) =>
                  field.onChange(`${field.value} ${emoji}`)
                }
              />
            </FormItem>
          )}
        />

        <Button disabled={isSubmitting}>
          <p className="h4">{`${comment ? 'Update' : 'Create'} comment`}</p>
        </Button>
      </form>
    </Form>
  )
}

const formatReqBody = ({
  formData,
  post,
}: {
  formData: PostFormData
  post?: Post
}) => {
  const reqBody = {
    posts: {
      ...(post
        ? {
            update: {
              where: {
                id: post.id,
              },
              data: formData,
            },
          }
        : { create: [formData] }),
    },
  }

  return reqBody
}
