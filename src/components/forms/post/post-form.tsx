'use client'

// actions
import {
  postCreateCurrentUserPost,
  postUpdateCurrentUserPost,
} from '@/actions/post-actions'

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
import { useForm } from 'react-hook-form'
import { useModal } from '@/hooks/use-modal-store'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'

// types
import {
  Post,
  PostCreatePostFormData,
  PostUpdatePostFormData,
  PostCreateCurrentUserPostReqBody,
  PostUpdatePostReqBody,
} from '@/types/post-types'
import { User } from '@/types/user-types'

// validation
import {
  postCreatePostFormSchema,
  postUpdatePostFormSchema,
} from '@/validation/post-validation'

interface PostForm {
  post?: Post
  user: User
}

export const PostForm: React.FC<PostForm> = ({ post, user }) => {
  const router = useRouter()
  const { toast } = useToast()
  const { onClose } = useModal()

  const form = useForm({
    resolver: zodResolver(
      post ? postCreatePostFormSchema : postUpdatePostFormSchema
    ),
    defaultValues: {
      body: post?.body || '',
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const createAction: () => void = handleSubmit(
    async (formData: PostCreatePostFormData) => {
      const reqBody = {
        ...formData,
        userId: user.id,
      } as PostCreateCurrentUserPostReqBody

      const response = await postCreateCurrentUserPost(reqBody)

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
    }
  )

  const updateAction: () => void = handleSubmit(
    async (formData: PostUpdatePostFormData) => {
      if (post) {
        const response = await postUpdateCurrentUserPost(
          post.id,
          formData as PostUpdatePostReqBody
        )

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
      }
    }
  )

  return (
    <Form {...form}>
      <form
        action={post ? updateAction : createAction}
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
          <p className="h4">{`${post ? 'Update' : 'Create'} post`}</p>
        </Button>
      </form>
    </Form>
  )
}
