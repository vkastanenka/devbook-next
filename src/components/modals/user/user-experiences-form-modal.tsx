'use client'

// components
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from '@/src/components/ui/dialog'
import { UserExperiencesForm } from '@/src/components/forms/user/user-experiences-form'

// utils
import { useModal } from '@/src/hooks/use-modal-store'

export const UserExperiencesFormModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { user },
  } = useModal()
  const isModalOpen = isOpen && type === 'userExperienceForm'
  if (!user) return null

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card flex flex-col gap-4">
        <DialogTitle>
          <p className="h3">Update Experience</p>
        </DialogTitle>
        <DialogDescription></DialogDescription>
        <UserExperiencesForm user={user} />
      </DialogContent>
    </Dialog>
  )
}
