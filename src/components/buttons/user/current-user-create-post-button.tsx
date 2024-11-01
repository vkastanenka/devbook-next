'use client'

// utils
import { useModal } from '@/hooks/use-modal-store'

// types
import { User } from '@/types/user-types'

export const CurrentUserCreatePostButton: React.FC<{
  currentUser: User
}> = ({ currentUser }) => {
  const { onOpen } = useModal()

  return (
    <button
      className="button-rounded w-full"
      onClick={() => onOpen('postForm', { user: currentUser })}
    >{`What's on your mind, ${currentUser.name.split(' ')[0]}?`}</button>
  )
}