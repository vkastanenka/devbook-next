'use client'

// actions
import {
  postCreateCurrentUserComment,
  postUpdateCurrentUserComment,
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
  Comment,
  Post,
  PostCreateCommentFormData,
  PostUpdateCommentFormData,
  PostCreateCurrentUserCommentReqBody,
  PostUpdateCommentReqBody,
} from '@/types/post-types'
import { User } from '@/types/user-types'

// validation
import {
  postCreateCommentFormSchema,
  postUpdateCommentFormSchema,
} from '@/validation/post-validation'

interface PostCommentForm {
  comment?: Comment
  parentComment?: Comment
  post: Post
  user: User
}

export const PostCommentForm: React.FC<PostCommentForm> = ({
  comment,
  parentComment,
  post,
  user,
}) => {
  const router = useRouter()
  const { toast } = useToast()
  const { onClose } = useModal()

  const form = useForm({
    resolver: zodResolver(
      comment ? postUpdateCommentFormSchema : postCreateCommentFormSchema
    ),
    defaultValues: {
      body: comment?.body || '',
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const createAction: () => void = handleSubmit(
    async (formData: PostCreateCommentFormData) => {
      const reqBody = {
        ...formData,
        ...(parentComment?.id ? { parentComment: parentComment.id } : {}),
        postId: post.id,
        userId: user.id,
      } as PostCreateCurrentUserCommentReqBody

      const response = await postCreateCurrentUserComment(reqBody)

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
    async (formData: PostUpdateCommentFormData) => {
      if (comment) {
        const response = await postUpdateCurrentUserComment(
          comment.id,
          formData as PostUpdateCommentReqBody
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
        action={comment ? updateAction : createAction}
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
