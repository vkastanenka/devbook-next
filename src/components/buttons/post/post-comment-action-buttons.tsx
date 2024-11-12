'use client'

// actions
import {
  postCreateCurrentUserCommentLike,
  postDeleteCurrentUserCommentLike,
} from '@/src/actions/post-actions'

// svg
import { MessageSquareText, ThumbsUp } from 'lucide-react'

// utils
import { useRouter } from 'next/navigation'
import { useModal } from '@/src/hooks/use-modal-store'
import { useToast } from '@/src/hooks/use-toast'

// types
import { Comment, Post } from '@/src/types/post-types'
import { User } from '@/src/types/user-types'

interface CommentActionButtons {
  comment: Comment
  currentUser: User
  post: Post
}

export const CommentActionButtons: React.FC<CommentActionButtons> = ({
  comment,
  currentUser,
  post,
}) => {
  const router = useRouter()
  const { toast } = useToast()
  const { onOpen } = useModal()

  const likeComment = async () => {
    if (currentUser) {
      let commentLikeId, response

      comment.commentLikes?.every((commentLike) => {
        if (commentLike.userId === currentUser.id) {
          commentLikeId = commentLike.id
          return false
        }
        return true
      })

      if (commentLikeId) {
        response = await postDeleteCurrentUserCommentLike(commentLikeId)
      } else {
        response = await postCreateCurrentUserCommentLike({
          commentId: comment.id,
          userId: currentUser.id,
        })
      }

      if (!response.success) {
        toast({
          title: 'Error!',
          description: response.message,
          variant: 'destructive',
        })
        return
      }

      router.refresh()

      toast({
        title: 'Success!',
        description: response.message,
      })
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button className="muted flex gap-1 items-center" onClick={likeComment}>
        <ThumbsUp className="w-4" />
        Like
      </button>
      <button
        className="muted flex gap-1 items-center"
        onClick={() =>
          onOpen('postCommentForm', {
            post,
            parentComment: comment,
            user: currentUser,
          })
        }
      >
        <MessageSquareText className="w-4" />
        Reply
      </button>
    </div>
  )
}
