'use client'

// utils
import { useModal } from '@/src/hooks/use-modal-store'

// types
import { Post } from '@/src/types/post-types'
import { User } from '@/src/types/user-types'

export const CurrentUserCreateCommentButton: React.FC<{
  post: Post
  currentUser: User
}> = ({ post, currentUser }) => {
  const { onOpen } = useModal()

  return (
    <button
      className="button-rounded w-full"
      onClick={() =>
        onOpen('postCommentForm', {
          navPrev: () => onOpen('post', { post, user: currentUser }),
          post,
          user: currentUser,
        })
      }
    >
      Leave a comment
    </button>
  )
}
