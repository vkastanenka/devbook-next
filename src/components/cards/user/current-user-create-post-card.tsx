'use client'

// components
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { UserAvatar } from '@/components/ui/avatar'

// utils
import { useModal } from '@/hooks/use-modal-store'

// types
import { User } from '@/types/user-types'

export const CurrentUserCreatePostCard: React.FC<{
  currentUser: User
}> = ({ currentUser }) => {
  const { onOpen } = useModal()

  return (
    <Card className="card flex items-center gap-2">
      <Link className="rounded-full" href={`/user/${currentUser.username}`}>
        <UserAvatar user={currentUser} />
      </Link>
      <button
        className="button-rounded"
        onClick={() => onOpen('createPost', { user: currentUser })}
      >{`What's on your mind, ${currentUser.name.split(' ')[0]}?`}</button>
    </Card>
  )
}
