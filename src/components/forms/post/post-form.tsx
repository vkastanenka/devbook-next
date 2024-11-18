'use client'

// actions
import {
  postCreateCurrentUserPost,
  postUpdateCurrentUserPost,
} from '@/actions/post-actions'

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
import { useFeedStore } from '@/src/hooks/use-feed-store'
import { useModal } from '@/src/hooks/use-modal-store'
import { useToast } from '@/src/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'

// types
import {
  PostCreatePostFormData,
  PostUpdatePostFormData,
  PostCreatePostReqBody,
  PostUpdatePostReqBody,
} from '@/src/types/post-types'

// validation
import {
  postCreatePostFormSchema,
  postUpdatePostFormSchema,
} from '@/src/validation/post-validation'

export const PostForm = () => {
  const router = useRouter()
  const { toast } = useToast()
  const {
    onClose,
    data: { post, user: currentUser },
  } = useModal()
  const {
    feedCurrentPost,
    addFeedPost,
    updateFeedPost,
    updateFeedCurrentPost,
  } = useFeedStore()

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
      if (currentUser) {
        const reqBody = {
          ...formData,
          userId: currentUser.id,
        } as PostCreatePostReqBody

        const response = await postCreateCurrentUserPost(reqBody)

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

        addFeedPost(response.data)

        toast({
          title: 'Success!',
          description: response.message,
        })

        onClose()
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

        if (feedCurrentPost) updateFeedCurrentPost(response.data)
        else updateFeedPost(response.data)

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
        action={post ? updateAction : createAction}
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
                  placeholder="What's on your mind?"
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
