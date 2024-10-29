'use client'

// components
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { UserExperienceForm } from '@/components/forms/user/user-experience-form'

// utils
import { useModal } from '@/hooks/use-modal-store'

export const UserExperienceFormModal = () => {
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
        <UserExperienceForm user={user} />
      </DialogContent>
    </Dialog>
  )
}
