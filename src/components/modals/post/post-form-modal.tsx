'use client'

// components
import { Dialog, DialogContent } from '@/components/ui/dialog'
// import { PostForm } from '@/components/forms/post/post-form'

// utils
import { useModal } from '@/hooks/use-modal-store'

export const PostFormModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { post, user },
  } = useModal()
  const isModalOpen = isOpen && type === 'postForm'

  if (!user && isModalOpen) onClose()
  if (!user) return null

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card flex flex-col gap-4">
        <p className="h3">{`${post ? 'Update' : 'Create'} post`}</p>
        {/* <PostForm post={post} user={user} /> */}
      </DialogContent>
    </Dialog>
  )
}
