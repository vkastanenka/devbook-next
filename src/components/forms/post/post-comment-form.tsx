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
} from '@/src/types/post-types'

// validation
import {
  postCreateCommentFormSchema,
  postUpdateCommentFormSchema,
} from '@/src/validation/post-validation'

export const CommentForm = () => {
  const router = useRouter()
  const { toast } = useToast()
  const { data, onClose } = useModal()
  const { comment, parentComment, post, user: currentUser } = data
  const { addFeedPostComment, updateFeedPostComment } = useFeedStore()

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

        addFeedPostComment(response.data)

        toast({
          title: 'Success!',
          description: response.message,
        })

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

        if (!response.success) {
          toast({
            title: 'Error!',
            description: response.message,
            variant: 'destructive',
          })
          return
        }

        router.refresh()

        updateFeedPostComment(comment)

        toast({
          title: 'Success!',
          description: response.message,
        })

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

        <Button disabled={isSubmitting}>
          <p className="h4">{`${comment ? 'Update' : 'Create'} comment`}</p>
        </Button>
      </form>
    </Form>
  )
}
