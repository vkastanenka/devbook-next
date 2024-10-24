// components
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Avatar } from '@/components/primitives/avatar'
import { Typography } from '@/components/ui/typography'

// types
import { User } from '@/lib/types'

interface CurrentUserCard {
  currentUser: User
}

export const CurrentUserCard: React.FC<CurrentUserCard> = ({ currentUser }) => {
  return (
    <Card>
      <Link className="block" href={`/user/${currentUser.username}`}>
        <div className="card flex flex-col gap-4">
          <Avatar src={currentUser.image || undefined} className="avatar-lg" />
          <div>
            <Typography.H3>{currentUser.name}</Typography.H3>
            {currentUser.headline && (
              <Typography.P className="text-accent">
                {currentUser.headline}
              </Typography.P>
            )}
          </div>
        </div>
      </Link>
    </Card>
  )
}
