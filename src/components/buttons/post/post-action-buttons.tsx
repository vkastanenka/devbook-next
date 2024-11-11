'use client'

// actions
import {
  postReadPost,
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
  className?: string
  currentUser: User
  post: Post
}

export const PostActionButtons: React.FC<PostActionButtons> = ({
  className,
  currentUser,
  post,
}) => {
  const router = useRouter()
  const { toast } = useToast()
  const { onOpen } = useModal()

  const styleButton = 'gap-2 flex justify-center items-center py-3'

  const likePost = async () => {
    let postIsLiked, likedPostId, response

    post.postLikes?.every((postLike) => {
      if (postLike.userId === currentUser.id) {
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
        userId: currentUser.id,
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

  const openCommentsModal = async () => {
    const response = await postReadPost(post.id, {
      include: {
        comments: {
          orderBy: { createdAt: 'desc' },
          include: {
            commentLikes: true,
            subComments: { include: { commentLikes: true, user: true } },
            user: true,
          },
        },
        user: true,
      },
    })

    if (!response.success) {
      toast({
        title: 'Error!',
        description: response.message,
        variant: 'destructive',
      })
    }

    if (response.success && response.data) {
      toast({
        title: 'Success!',
        description: response.message,
      })
      onOpen('post', { post: response.data, user: currentUser })
    }
  }

  return (
    <div className={className}>
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
        <button className={styleButton} onClick={openCommentsModal}>
          <p className="p">View comments</p>
          <CircleArrowRight />
        </button>
      </div>
    </div>
  )
}
