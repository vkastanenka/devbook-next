'use client'

// svg
import { Pencil } from 'lucide-react'

// utils
import { cn } from '@/src/lib/utils'
import { useModal } from '@/hooks/use-modal-store'

// types
import { ModalType } from '@/hooks/use-modal-store'
import { User } from '@/types/user-types'

interface UserEditCardButton {
  className?: string
  modalType: ModalType
  user: User
}

export const UserEditCardButton: React.FC<UserEditCardButton> = ({
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
