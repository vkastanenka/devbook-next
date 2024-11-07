// components
import Link from 'next/link'
import { Card } from '@/src/components/ui/card'
import { UserAvatar } from '@/src/components/ui/avatar'

// types
import { User } from '@/src/types/user-types'

export const CurrentUserCard: React.FC<{ currentUser: User }> = ({
  currentUser,
}) => {
  return (
    <Card>
      <Link className="block" href={`/user/${currentUser.username}`}>
        <div className="card flex flex-col gap-2">
          <UserAvatar className="avatar-lg" user={currentUser} />
          <div>
            <p className="h4">{currentUser.name}</p>
            {currentUser.headline && (
              <p className="muted text-accent">{currentUser.headline}</p>
            )}
          </div>
        </div>
      </Link>
    </Card>
  )
}
