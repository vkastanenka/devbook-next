'use client'

// components
import { Dialog, DialogContent } from '@/components/ui/dialog'
// import { UserBioForm } from '@/components/forms/user/user-bio-form'

// utils
import { useModal } from '@/hooks/use-modal-store'

export const UserBioFormModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { user },
  } = useModal()
  const isModalOpen = isOpen && type === 'userBioForm'

  if (!user && isModalOpen) onClose()
  if (!user) return null

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card flex flex-col gap-4">
        <p className="h3">Update bio</p>
        {/* <UserBioForm user={user} /> */}
      </DialogContent>
    </Dialog>
  )
}
