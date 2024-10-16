'use client'

// components
import { PostButton } from '@/components/buttons/post-button'

// utils
import { useModal } from '@/hooks/use-modal-store'

export const CreatePostButton = () => {
  const { onOpen } = useModal()

  return (
    <PostButton
      onClick={() => onOpen('createPost')}
    >{`What's on your mind, Victoria?`}</PostButton>
  )
}
