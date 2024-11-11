'use client'

// actions
import {
  postCreateCurrentUserCommentLike,
  postDeleteCurrentUserCommentLike,
} from '@/src/actions/post-actions'

// utils
import { useModal } from '@/src/hooks/use-modal-store'
import { useToast } from '@/src/hooks/use-toast'

// types
import { Comment } from '@/src/types/post-types'

interface CommentActionButtons {
  comment: Comment
}

export const CommentActionButtons: React.FC<CommentActionButtons> = ({
  comment,
}) => {
  const { toast } = useToast()
  const {
    data: { post, user: currentUser },
    setData,
    onOpen,
  } = useModal()

  const likeComment = async () => {
    if (currentUser) {
      let commentIsLiked, likedCommentId, response

      comment.commentLikes?.every((commentLike) => {
        if (commentLike.userId === currentUser.id) {
          commentIsLiked = true
          likedCommentId = commentLike.id

          return false
        }
        return true
      })

      if (comment.commentLikes && commentIsLiked && likedCommentId) {
        response = await postDeleteCurrentUserCommentLike(likedCommentId)

        if (response.success) {
          comment.commentLikes = comment.commentLikes.filter(
            (commentLike) => !(commentLike.userId === comment.userId)
          )
        }
      } else {
        response = await postCreateCurrentUserCommentLike({
          commentId: comment.id,
          userId: currentUser.id,
        })

        if (response.data) {
          comment.commentLikes = [
            ...(comment.commentLikes ? comment.commentLikes : []),
            response.data,
          ]
        }
      }

      if (!response.success && !response.errors) {
        toast({
          title: 'Error!',
          description: response.message,
          variant: 'destructive',
        })
      }

      if (response.success) {
        post?.comments?.map((cmnt) => (cmnt.id === comment.id ? comment : cmnt))
        setData({ post, user: currentUser })

        toast({
          title: 'Success!',
          description: response.message,
        })
      }
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button className="muted" onClick={likeComment}>
        Like
      </button>
      <button
        className="muted"
        onClick={() =>
          onOpen('postCommentForm', {
            navPrev: () => onOpen('post', { post, user: currentUser }),
            parentComment: comment,
            post,
            user: currentUser,
          })
        }
      >
        Reply
      </button>
    </div>
  )
}
