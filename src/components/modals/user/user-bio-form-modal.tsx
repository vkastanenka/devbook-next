'use client'

// components
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from '@/src/components/ui/dialog'
import { UserBioForm } from '@/src/components/forms/user/user-bio-form'

// utils
import { useModal } from '@/src/hooks/use-modal-store'

export const UserBioFormModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { user },
  } = useModal()
  const isModalOpen = isOpen && type === 'userBioForm'
  if (!user) return null

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card flex flex-col gap-4">
        <DialogTitle>
          <p className="h3">Update Bio</p>
        </DialogTitle>
        <DialogDescription></DialogDescription>
        <UserBioForm user={user} />
      </DialogContent>
    </Dialog>
  )
}
