// components
import Link from 'next/link'
import { Card } from '@/src/components/ui/card'
import { UserAvatar } from '@/src/components/ui/avatar'
import { CurrentUserCreatePostButton } from '@/src/components/buttons/user/current-user-create-post-button'

// types
import { User } from '@/src/types/user-types'

export const CurrentUserCreatePostCard: React.FC<{
  currentUser: User
}> = ({ currentUser }) => {
  return (
    <Card className="card flex items-center gap-2">
      <Link className="hover-overlay after:rounded-full" href={`/user/${currentUser.username}`}>
        <UserAvatar user={currentUser} />
        {/* <div className="button-text-accent rounded-full h-full w-full absolute top-0 left-0 opacity-20" /> */}
      </Link>
      <CurrentUserCreatePostButton currentUser={currentUser} />
    </Card>
  )
}
