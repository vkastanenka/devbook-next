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
  const { toast } = useToast()
  const { data, setData, onClose } = useModal()
  const { comment, navPrev, parentComment, post, user: currentUser } = data

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
        const { data: resComment } = response

        // Error messaging
        if (!resComment) {
          toast({
            title: 'Error!',
            description: response.message,
            variant: 'destructive',
          })
          return
        }

        // Add current user to comment
        resComment.user = currentUser

        // Update state
        if (!parentComment) {
          if (!post.comments) post.comments = [resComment]
          else post.comments = [resComment, ...post.comments]
          setData({ ...data, post })
        } else {
          if (!parentComment.subComments) {
            parentComment.subComments = [resComment]
          } else {
            parentComment.subComments = [
              resComment,
              ...parentComment.subComments,
            ]
          }
          setData({ ...data, parentComment })
        }

        // Success messaging
        toast({
          title: 'Success!',
          description: response.message,
        })

        // Navigate
        if (navPrev) navPrev()
        else onClose()
      }
    }
  )

  const updateAction: () => void = handleSubmit(
    async (formData: PostUpdateCommentFormData) => {
      if (post && comment) {
        const response = await postUpdateCurrentUserComment(
          comment.id,
          formData as PostUpdateCommentReqBody
        )
        const { data: resComment } = response

        // Error messaging
        if (!resComment) {
          toast({
            title: 'Error!',
            description: response.message,
            variant: 'destructive',
          })
          return
        }

        // Add current user to comment
        resComment.user = currentUser

        // Update state
        if (!parentComment && post.comments) {
          post.comments = post.comments.map((comment) =>
            resComment.id === comment.id ? resComment : comment
          )
          setData({ ...data, post })
        }

        if (parentComment?.subComments) {
          parentComment.subComments = parentComment.subComments.map((comment) =>
            resComment.id === comment.id ? resComment : comment
          )
          setData({ ...data, parentComment })
        }

        // Success messaging
        toast({
          title: 'Success!',
          description: response.message,
        })

        // Navigate
        if (navPrev) navPrev()
        else onClose()
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
