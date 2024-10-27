'use client'

// components
import { PostButton } from '@/src/components/modules/buttons/post-button'

// utils
import { useModal } from '@/hooks/use-modal-store'

// types
import { User } from '@/lib/types'

interface CreatePostButton {
  user: User
}

/**
 * TODO:
 *
 * 1. Find a better home / refactor
 */

export const CreatePostButton: React.FC<CreatePostButton> = ({ user }) => {
  const { onOpen } = useModal()

  return (
    <PostButton
      onClick={() => onOpen('createPost', { user })}
    >{`What's on your mind, Victoria?`}</PostButton>
  )
}
