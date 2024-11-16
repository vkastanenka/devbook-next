'use client'

// utils
import { cn } from '@/src/lib/utils'
import { useModal } from '@/src/hooks/use-modal-store'

// types
import { User } from '@/src/types/user-types'

export const UserOpenUserContactsModalButton: React.FC<{
  className?: string
  user: User
}> = ({ className, user }) => {
  const { onOpen } = useModal()

  return (
    <button
      className={cn(
        'w-full p-1 button-text text-card-foreground flex justify-between items-center gap-2',
        className
      )}
      onClick={() => onOpen('userContacts', { user })}
    >
      <span>...</span>
      <span>see more</span>
    </button>
  )
}
