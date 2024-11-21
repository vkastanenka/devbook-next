'use client'

// utils
import { cn } from '@/src/lib/utils'
import { useModal } from '@/src/hooks/use-modal-store'

// types
import { User } from '@vkastanenka/devbook-types/dist/user'

export const UserOpenUserContactsModalButton: React.FC<{
  className?: string
  user: User
}> = ({ className, user }) => {
  const { onOpen } = useModal()

  return (
    <button
      className={cn(
        'button-text w-full flex text-card-foreground justify-between gap-2',
        className
      )}
      onClick={() => onOpen('userContacts', { user })}
    >
      <span>...</span>
      <span>see more</span>
    </button>
  )
}
