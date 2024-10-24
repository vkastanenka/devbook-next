// components
import { Card } from '@/components/primitives/card'
import { Avatar } from '@/components/primitives/avatar'
import { Typography } from '@/components/ui/typography'
import { UserCardButtons } from '@/components/modules/user-card-buttons'

// types
import { User } from '@/lib/types'

interface UserCard {
  user: User
}

export const UserCard: React.FC<UserCard> = ({ user }) => {
  return (
    <Card className="flex flex-col gap-4">
      <Avatar src={user.image || undefined} className="avatar-lg" />
      <div className="flex flex-col gap-2">
        <div>
          <div className="flex gap-2">
            <Typography.H3>{user.name}</Typography.H3>
            {user.pronouns && (
              <Typography.Muted className="text-accent">
                {user.pronouns}
              </Typography.Muted>
            )}
          </div>
          {user.headline && <Typography.P>{user.headline}</Typography.P>}
          {user.addresses?.length && (
            <Typography.Muted className="text-accent">
              <span>{`${user.addresses[0].suburbName}, `}</span>
              <span>{`${user.addresses[0].stateName}, `}</span>
              <span>{`${user.addresses[0].country}`}</span>
            </Typography.Muted>
          )}
        </div>
        <UserCardButtons user={user} />
      </div>
    </Card>
  )
}
