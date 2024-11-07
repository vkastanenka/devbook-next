'use client'

// actions
import {
  postCreateCurrentUserPostLike,
  postDeleteCurrentUserPostLike,
} from '@/src/actions/post-actions'

// svg
import { CircleArrowRight, MessageSquareText, ThumbsUp } from 'lucide-react'

// utils
import { useModal } from '@/src/hooks/use-modal-store'
import { useRouter } from 'next/navigation'
import { useToast } from '@/src/hooks/use-toast'

// types
import { Post } from '@/src/types/post-types'
import { User } from '@/src/types/user-types'

interface PostActionButtons {
  post: Post
  user: User
}

export const PostActionButtons: React.FC<PostActionButtons> = ({
  user,
  post,
}) => {
  const router = useRouter()
  const { toast } = useToast()
  const { onOpen } = useModal()

  if (!post.user || post.userId !== user.id) return null

  const styleButton = 'gap-2 flex justify-center items-center py-3'

  const likePost = async () => {
    let postIsLiked, likedPostId, response

    post.postLikes?.every((postLike) => {
      if (postLike.userId === user.id) {
        postIsLiked = true
        likedPostId = postLike.id

        return false
      }
      return true
    })

    if (postIsLiked && likedPostId) {
      response = await postDeleteCurrentUserPostLike(likedPostId)
    } else {
      response = await postCreateCurrentUserPostLike({
        postId: post.id,
        userId: user.id,
      })
    }

    if (!response.success && !response.errors) {
      toast({
        title: 'Error!',
        description: response.message,
        variant: 'destructive',
      })
    }

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
            onClick={() => onOpen('postCommentForm', { post, user })}
          >
            <MessageSquareText />
            <p className="p">Comment</p>
          </button>
        </div>
        <button
          className={styleButton}
          onClick={() => onOpen('postComments', { post, user })}
        >
          <p className="p">View comments</p>
          <CircleArrowRight />
        </button>
      </div>
    </div>
  )
}
