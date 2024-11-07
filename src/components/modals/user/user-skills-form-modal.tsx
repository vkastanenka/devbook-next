'use client'

// components
import { Dialog, DialogContent } from '@/src/components/ui/dialog'
import { UserSkillsForm } from '@/src/components/forms/user/user-skills-form'

// utils
import { useModal } from '@/src/hooks/use-modal-store'

export const UserSkillsFormModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { user },
  } = useModal()
  const isModalOpen = isOpen && type === 'userSkillsForm'

  if (!user && isModalOpen) onClose()
  if (!user) return null

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card flex flex-col gap-4">
        <p className="h3">Update skills</p>
        <UserSkillsForm user={user} />
      </DialogContent>
    </Dialog>
  )
}
