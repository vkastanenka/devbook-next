'use client'

// svg
import { Pencil } from 'lucide-react'

// utils
import { cn } from '@/src/lib/utils'
import { useModal } from '@/hooks/use-modal-store'

// types
import { ModalType } from '@/hooks/use-modal-store'
import { User } from '@/types/user-types'

interface UserEditButton {
  className?: string
  modalType: ModalType
  user: User
}

export const UserEditButton: React.FC<UserEditButton> = ({
  className,
  modalType,
  user,
}) => {
  const { onOpen } = useModal()

  return (
    <button
      className={cn('absolute top-4 right-4', className)}
      onClick={() => onOpen(modalType, { user })}
    >
      <Pencil />
    </button>
  )
}
