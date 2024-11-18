'use client'

// svg
import { MessageSquareText } from 'lucide-react'

// utils
import { useModal } from '@/src/hooks/use-modal-store'

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
  const { onOpen } = useModal()

  return (
    <div className="flex items-center gap-2">
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
