'use client'

// svg
import { MessageSquareText } from 'lucide-react'

// utils
import { useModal } from '@/src/hooks/use-modal-store'

// types
import { Comment, Post } from '@vkastanenka/devbook-types/dist/post'
import { User } from '@vkastanenka/devbook-types/dist/user'

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
        className="button-text"
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
