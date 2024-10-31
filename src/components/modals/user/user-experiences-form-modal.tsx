'use client'

// components
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { UserExperiencesForm } from '@/components/forms/user/user-experiences-form'

// utils
import { useModal } from '@/hooks/use-modal-store'

export const UserExperiencesFormModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { user },
  } = useModal()
  const isModalOpen = isOpen && type === 'userExperienceForm'

  if (!user && isModalOpen) onClose()
  if (!user) return null

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card flex flex-col gap-4">
        <p className="h3">Update experience</p>
        <UserExperiencesForm user={user} />
      </DialogContent>
    </Dialog>
  )
}
