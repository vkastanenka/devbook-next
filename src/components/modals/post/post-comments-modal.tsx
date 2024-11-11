'use client'

// components
import { Dialog, DialogContent } from '@/src/components/ui/dialog'
import {
  PostUser,
  PostBody,
  PostActivity,
  PostComments,
} from '@/src/components/ui/post'
import { Separator } from '@/src/components/ui/separator'

// utils
import { useModal } from '@/src/hooks/use-modal-store'

export const PostCommentsModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { post, user },
  } = useModal()
  const isModalOpen = isOpen && type === 'postComments'

  if ((!post || !post.user || !user) && isModalOpen) onClose()
  if (!post || !post.user || !user) return null

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card flex flex-col gap-4 max-h-[50vh] overflow-y-auto">
        <p className="h3">{`${post.user.name.split(' ')[0]}'s post`}</p>
        <Separator />
        <PostUser post={post} />
        <PostBody post={post} />
        <PostActivity post={post} />
        <Separator />
        <PostComments post={post} currentUser={user} />
      </DialogContent>
    </Dialog>
  )
}
