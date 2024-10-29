'use client'

// components
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { UserAboutForm } from '@/components/forms/user/user-about-form'

// utils
import { useModal } from '@/hooks/use-modal-store'

export const UserAboutFormModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { user },
  } = useModal()
  const isModalOpen = isOpen && type === 'userAboutForm'

  if (!user && isModalOpen) onClose()
  if (!user) return null

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card flex flex-col gap-4">
        <p className="h3">Update About</p>
        <UserAboutForm user={user} />
      </DialogContent>
    </Dialog>
  )
}
