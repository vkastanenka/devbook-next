'use client'

// components
import { Dialog, DialogTitle, DialogContent } from '@/src/components/ui/dialog'
import { PostForm } from '@/src/components/forms/post/post-form'

// utils
import { useModal } from '@/src/hooks/use-modal-store'

export const PostFormModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { post },
  } = useModal()
  const isModalOpen = isOpen && type === 'postForm'

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card flex flex-col gap-4">
        <DialogTitle>
          <p className="h3">{`${post ? 'Update' : 'Create'} post`}</p>
        </DialogTitle>
        <PostForm />
      </DialogContent>
    </Dialog>
  )
}
