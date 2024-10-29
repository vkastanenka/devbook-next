'use client'

// components
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { UserForm } from '@/components/forms/user/user-form'

// utils
import { useModal } from '@/hooks/use-modal-store'

export const UserFormModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { user },
  } = useModal()
  const isModalOpen = isOpen && type === 'userForm'

  if (!user && isModalOpen) onClose()
  if (!user) return null

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card flex flex-col gap-4 max-h-[75vh] overflow-scroll">
        <p className="h3">Update user</p>
        <UserForm user={user} />
      </DialogContent>
    </Dialog>
  )
}
