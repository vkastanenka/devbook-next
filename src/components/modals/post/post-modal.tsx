'use client'

// components
import Link from 'next/link'
import { Dialog, DialogContent } from '@/src/components/ui/dialog'
import { NoContentCard } from '@/src/components/cards/no-content/no-content-card'
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
    data: { post, user: currentUser },
  } = useModal()
  const isModalOpen = isOpen && type === 'post'

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card flex flex-col gap-4 max-h-[50vh] overflow-y-auto">
        {post?.user && currentUser ? (
          <>
            <p className="h3">{`${post.user.name.split(' ')[0]}'s post`}</p>
            <Separator />
            <PostUser post={post} />
            <PostBody post={post} />
            <PostActivity post={post} />
            <Separator />
            <div className="flex items-center gap-2">
              <Link
                className="rounded-full"
                href={`/user/${currentUser.username}`}
              >
                <UserAvatar user={currentUser} />
              </Link>
              <CurrentUserCreateCommentButton
                post={post}
                currentUser={currentUser}
              />
            </div>
            <PostComments post={post} currentUser={currentUser} />
          </>
        ) : (
          <NoContentCard heading='Missing data!' subheading='Check your state and try again.' />
        )}
      </DialogContent>
    </Dialog>
  )
}
