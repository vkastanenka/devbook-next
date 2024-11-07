'use client'

// components
import { Dialog, DialogContent } from '@/src/components/ui/dialog'
import { UserEducationsForm } from '@/src/components/forms/user/user-educations-form'

// utils
import { useModal } from '@/src/hooks/use-modal-store'

export const UserEducationsFormModal = () => {
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
        <UserEducationsForm user={user} />
      </DialogContent>
    </Dialog>
  )
}
