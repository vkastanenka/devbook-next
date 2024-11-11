'use client'

// components
import { Dialog, DialogContent } from '@/src/components/ui/dialog'
import { CommentForm } from '@/src/components/forms/post/post-comment-form'

// svg
import { CircleArrowLeft } from 'lucide-react'

// utils
import { useModal } from '@/src/hooks/use-modal-store'

export const PostCommentFormModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { comment, navPrev },
  } = useModal()
  const isModalOpen = isOpen && type === 'postCommentForm'

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card flex flex-col gap-4">
        <div className="flex items-center gap-2">
          {navPrev && (
            <button onClick={navPrev}>
              <CircleArrowLeft />
            </button>
          )}
          <p className="h3">{`${comment ? 'Update' : 'Create'} comment`}</p>
        </div>
        <CommentForm />
      </DialogContent>
    </Dialog>
  )
}
