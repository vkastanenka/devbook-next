'use client'

// svg
import { CircleArrowRight, MessageSquareText, ThumbsUp } from 'lucide-react'

// utils
import { updateUser } from '@/src/actions-old/user-actions'
import { useModal } from '@/hooks/use-modal-store'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { v4 as uuidv4 } from 'uuid'

// types
import { Post } from '@/types/post-types'
import { User } from '@/types/user-types'

export const PostActionButtons: React.FC<{
  currentUser: User
  post: Post
}> = ({ currentUser, post }) => {
  const router = useRouter()
  const { toast } = useToast()
  const { onOpen } = useModal()

  if (!post.user || post.userId !== currentUser.id) return null

  const styleButton = 'gap-2 flex justify-center items-center py-3'

  const likePost = async () => {
    let postIsLiked, likedPostId

    post.postLikes?.every((postLike) => {
      if (postLike.userId === currentUser.id) {
        postIsLiked = true
        likedPostId = postLike.id

        return false
      }
      return true
    })

    // TODO: updateUser not accepting body, figure out why
    const reqBody = {
      posts: {
        postLikes: {
          ...(postIsLiked && likedPostId
            ? { deleteMany: [{ id: likedPostId }] }
            : { create: [{ id: uuidv4() }] }),
        },
      },
    }

    // TODO: Fix TS
    const response = await updateUser(reqBody, post.user)

    if (!response.success && !response.errors) {
      toast({
        title: 'Error!',
        description: response.message,
        variant: 'destructive',
      })
    }

    // If successful, push to user feed
    if (response.success) {
      router.refresh()
      toast({
        title: 'Success!',
        description: response.message,
      })
    }
  }

  return (
    <div className="px-card">
      <div className="flex items-center justify-between gap-1 w-full">
        <div className="flex items-center gap-4">
          <button className={styleButton} onClick={likePost}>
            <ThumbsUp />
            <p className="p">Like</p>
          </button>
          <button
            className={styleButton}
            onClick={() =>
              onOpen('postCommentForm', { post, user: currentUser })
            }
          >
            <MessageSquareText />
            <p className="p">Comment</p>
          </button>
        </div>
        <button
          className={styleButton}
          onClick={() => onOpen('postComments', { post, user: currentUser })}
        >
          <p className="p">View comments</p>
          <CircleArrowRight />
        </button>
      </div>
    </div>
  )
}
