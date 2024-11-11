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
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form'
import { Textarea } from '@/src/components/ui/textarea'
import { Button } from '@/src/components/ui/button'

// utils
import { useForm } from 'react-hook-form'
import { useModal } from '@/src/hooks/use-modal-store'
import { useRouter } from 'next/navigation'
import { useToast } from '@/src/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'

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
  const {
    data: { comment, navPrev, parentComment, post, user: currentUser },
    setData,
    onClose,
  } = useModal()

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

        if (!response.success && !response.errors) {
          toast({
            title: 'Error!',
            description: response.message,
            variant: 'destructive',
          })
        }

        if (response.success) {
          if (navPrev) {
            setData({
              comment,
              navPrev,
              parentComment,
              post,
              user: currentUser,
            })
            navPrev()
          } else onClose()
          router.refresh()
          toast({
            title: 'Success!',
            description: response.message,
          })
        }
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

        if (!response.success && !response.errors) {
          toast({
            title: 'Error!',
            description: response.message,
            variant: 'destructive',
          })
        }

        if (response.data && post?.comments) {
          const updatedComments = post.comments.map((postComment) => {
            if (postComment.id === comment.id) {
              postComment.body = formData.body || ''
            }
            return postComment
          })

          post.comments = updatedComments

          if (navPrev) navPrev()
          else onClose()

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
