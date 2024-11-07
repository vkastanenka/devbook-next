'use client'

// components
import { Dialog, DialogContent } from '@/src/components/ui/dialog'
import { CommentForm } from '@/src/components/forms/post/post-comment-form'

// utils
import { useModal } from '@/src/hooks/use-modal-store'

export const PostCommentFormModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { comment, parentComment, post, user },
  } = useModal()
  const isModalOpen = isOpen && type === 'postCommentForm'

  if ((!user || !post) && isModalOpen) onClose()
  if (!user || !post) return null

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card flex flex-col gap-4">
        <p className="h3">Leave a comment</p>
        <CommentForm
          comment={comment}
          parentComment={parentComment}
          post={post}
          user={user}
        />
      </DialogContent>
    </Dialog>
  )
}
