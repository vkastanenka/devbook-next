'use client'

// components
import Link from 'next/link'
import { Dialog, DialogContent } from '@/src/components/ui/dialog'
import {
  PostUser,
  PostBody,
  PostActivity,
  PostComments,
} from '@/src/components/ui/post'
import { Separator } from '@/src/components/ui/separator'
import { UserAvatar } from '@/src/components/ui/avatar'
import { CurrentUserCreateCommentButton } from '@/src/components/buttons/user/current-user-create-comment-button'

// utils
import { useModal } from '@/src/hooks/use-modal-store'

export const PostModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { post, user },
  } = useModal()
  const isModalOpen = isOpen && type === 'post'

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
        <div className="flex items-center gap-2">
          <Link className="rounded-full" href={`/user/${user.username}`}>
            <UserAvatar user={user} />
          </Link>
          <CurrentUserCreateCommentButton post={post} currentUser={user} />
        </div>
        <PostComments post={post} currentUser={user} />
      </DialogContent>
    </Dialog>
  )
}
