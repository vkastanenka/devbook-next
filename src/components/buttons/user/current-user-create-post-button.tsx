'use client'

// utils
import { useModal } from '@/src/hooks/use-modal-store'
import { constrainText } from '@/src/lib/utils'

// types
import { User } from '@vkastanenka/devbook-types/dist/user'

export const CurrentUserCreatePostButton: React.FC<{
  currentUser: User
}> = ({ currentUser }) => {
  const { onOpen } = useModal()

  return (
    <button
      className="button-rounded w-full"
      onClick={() => onOpen('postForm', { user: currentUser })}
    >
      {`What's on your mind, ${constrainText(
        12,
        currentUser.name.split(' ')[0]
      )}?`}
    </button>
  )
}
