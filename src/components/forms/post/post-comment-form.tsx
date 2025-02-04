'use client'

// actions
import {
  postCreateCurrentUserComment,
  postUpdateCurrentUserComment,
} from '@/src/actions/post-actions'

// components
import { EmojiButton } from '@/src/components/buttons/emoji-button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/src/components/ui/form'
import { Textarea } from '@/src/components/ui/textarea'
import { Button } from '@/src/components/ui/button'

// utils
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFeedStore } from '@/src/hooks/use-feed-store'
import { useModal } from '@/src/hooks/use-modal-store'
import { useToast } from '@/src/hooks/use-toast'

// types
import {
  PostCreateCommentFormData,
  PostUpdateCommentFormData,
  PostCreateCommentReqBody,
  PostUpdateCommentReqBody,
} from '@vkastanenka/devbook-types/dist/post'

// validation
import {
  postCreateCommentFormSchema,
  postUpdateCommentFormSchema,
} from '@vkastanenka/devbook-validation/dist/post'

export const CommentForm = () => {
  const router = useRouter()
  const { toast } = useToast()
  const { data: modalData, onClose } = useModal()
  const { comment, parentComment, post, user: currentUser } = modalData
  const { addFeedPostComment } = useFeedStore()

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
      if (post && currentUser) {
        const reqBody = {
          ...formData,
          ...(parentComment?.id ? { parentCommentId: parentComment.id } : {}),
          postId: post.id,
          userId: currentUser.id,
        } as PostCreateCommentReqBody

        const response = await postCreateCurrentUserComment(reqBody)

        if (!response.data) {
          toast({
            title: 'Error!',
            description: response.message,
            variant: 'destructive',
          })
          return
        }

        router.refresh()

        response.data.user = currentUser

        addFeedPostComment(response.data)

        onClose()
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

        if (!response.data) {
          toast({
            title: 'Error!',
            description: response.message,
            variant: 'destructive',
          })
          return
        }

        router.refresh()

        onClose()
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

        <Button className="h4" disabled={isSubmitting}>
          {`${comment ? 'Update' : 'Create'} comment`}
        </Button>
      </form>
    </Form>
  )
}
