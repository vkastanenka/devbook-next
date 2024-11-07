'use client'

// components
import { Dialog, DialogContent } from '@/src/components/ui/dialog'
import { UserDetailsForm } from '@/src/components/forms/user/user-details-form'

// utils
import { useModal } from '@/src/hooks/use-modal-store'

export const UserDetailsFormModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { user },
  } = useModal()
  const isModalOpen = isOpen && type === 'userDetailsForm'

  if (!user && isModalOpen) onClose()
  if (!user) return null

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card flex flex-col gap-4">
        <p className="h3">Update user details</p>
        <UserDetailsForm user={user} />
      </DialogContent>
    </Dialog>
  )
}
