// components
import { Card } from '@/components/primitives/card'
import { Avatar } from '@/components/primitives/avatar'
import { UserCardButtons } from '@/components/modules/user-card-buttons'
import { UserEditButton } from '@/components/modules/buttons/user-edit-button'

// types
import { UserDataCard } from '@/types/user-types'

/**
 * TODO:
 *
 * 1. If current user, add edit icon in profile page
 * 2. If not current user, add add contact / remove contact icon
 * 3. Make sure optional fields like address are updated to be required so no weird front end
 */

export const UserCard: React.FC<UserDataCard> = ({ isEditable, user }) => {
  return (
    <Card className="flex flex-col gap-2 relative">
      {isEditable && <UserEditButton />}
      <Avatar src={user.image || undefined} className="avatar-lg" />
      <div>
        <div className="flex gap-2">
          <p className="h3">{user.name}</p>
          {user.pronouns && (
            <p className="muted text-accent">{user.pronouns}</p>
          )}
        </div>
        {user.headline && <p className="p">{user.headline}</p>}
        {user.addresses?.length && (
          <p className="muted text-accent">
            <span>{`${user.addresses[0].suburbName}, `}</span>
            <span>{`${user.addresses[0].stateName}, `}</span>
            <span>{`${user.addresses[0].country}`}</span>
          </p>
        )}
      </div>
      <UserCardButtons user={user} />
    </Card>
  )
}
