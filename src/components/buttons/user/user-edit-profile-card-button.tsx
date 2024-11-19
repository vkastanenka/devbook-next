'use client'

// svg
import { Pencil } from 'lucide-react'

// utils
import { cn } from '@/src/lib/utils'
import { useModal } from '@/src/hooks/use-modal-store'

// types
import { ModalType } from '@/src/hooks/use-modal-store'
import { User } from '@/src/types/user-types'

interface UserEditProfileCardButton {
  className?: string
  modalType: ModalType
  user: User
}

export const UserEditProfileCardButton: React.FC<UserEditProfileCardButton> = ({
  className,
  modalType,
  user,
}) => {
  const { onOpen } = useModal()

  return (
    <button
      className={cn('button-text absolute top-4 right-4', className)}
      onClick={() => onOpen(modalType, { user })}
    >
      <Pencil />
    </button>
  )
}
