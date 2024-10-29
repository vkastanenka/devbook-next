'use client'

// components
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { UserSkillsForm } from '@/components/forms/user/user-skills-form'

// utils
import { useModal } from '@/hooks/use-modal-store'

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
        <p className="h3">Update User Skills</p>
        <UserSkillsForm user={user} />
      </DialogContent>
    </Dialog>
  )
}
