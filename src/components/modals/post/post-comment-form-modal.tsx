'use client'

// components
import { Dialog, DialogContent } from '@/components/ui/dialog'
// import { PostCommentForm } from '@/components/forms/post/post-comment-form'

// utils
import { useModal } from '@/hooks/use-modal-store'

export const PostCommentFormModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { post, user },
  } = useModal()
  const isModalOpen = isOpen && type === 'postCommentForm'

  if (!user && isModalOpen) onClose()
  if (!user) return null

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card flex flex-col gap-4">
        <p className="h3">Leave a comment</p>
        {/* <PostCommentForm post={post} user={user} /> */}
      </DialogContent>
    </Dialog>
  )
}
