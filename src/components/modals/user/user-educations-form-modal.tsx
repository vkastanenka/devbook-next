'use client'

// components
import { Dialog, DialogTitle, DialogContent } from '@/src/components/ui/dialog'
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
  if (!user) return null

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card flex flex-col gap-4">
        <DialogTitle>
          <p className="h3">Update Education</p>
        </DialogTitle>
        <UserEducationsForm user={user} />
      </DialogContent>
    </Dialog>
  )
}
