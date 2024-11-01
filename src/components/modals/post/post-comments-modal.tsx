'use client'

// components
import { Dialog, DialogContent } from '@/components/ui/dialog'

// utils
import { useModal } from '@/hooks/use-modal-store'

export const PostCommentsModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { post, user },
  } = useModal()
  const isModalOpen = isOpen && type === 'postComments'

  if (!user && isModalOpen) onClose()
  if (!user) return null

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card flex flex-col gap-4">
        <p className="h3">Post comments</p>
      </DialogContent>
    </Dialog>
  )
}
