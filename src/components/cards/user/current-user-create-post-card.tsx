// components
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { UserAvatar } from '@/components/ui/avatar'
import { CurrentUserCreatePostButton } from '@/components/buttons/user/current-user-create-post-button'

// types
import { User } from '@/types/user-types'

export const CurrentUserCreatePostCard: React.FC<{
  currentUser: User
}> = ({ currentUser }) => {
  return (
    <Card className="card flex items-center gap-2">
      <Link className="rounded-full" href={`/user/${currentUser.username}`}>
        <UserAvatar user={currentUser} />
      </Link>
      <CurrentUserCreatePostButton currentUser={currentUser} />
    </Card>
  )
}
