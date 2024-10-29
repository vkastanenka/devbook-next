'use client'

// components
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { UserEducationForm } from '@/components/forms/user/user-education-form'

// utils
import { useModal } from '@/hooks/use-modal-store'

export const UserEducationFormModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { user },
  } = useModal()
  const isModalOpen = isOpen && type === 'userEducationForm'

  if (!user && isModalOpen) onClose()
  if (!user) return null

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card flex flex-col gap-4">
        <p className="h3">Update education</p>
        <UserEducationForm user={user} />
      </DialogContent>
    </Dialog>
  )
}
