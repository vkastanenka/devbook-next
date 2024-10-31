// components
import { Card } from '@/components/ui/card'
import { UserAvatar } from '@/components/ui/avatar'
import { UserCardButtons } from '@/components/modules/user-card-buttons'
import { UserEditCardButton } from '@/components/modules/buttons/user-edit-card-button'

// types
import { UserProfileCard } from '@/types/user-types'

/**
 * TODO:
 *
 * If not current user, add add contact / remove contact icon
 */

export const UserDetailsCard: React.FC<UserProfileCard> = ({
  isEditable,
  user,
}) => {
  return (
    <Card className="card flex flex-col gap-2 relative">
      {isEditable && <UserEditCardButton modalType="userDetailsForm" user={user} />}
      <UserAvatar
        src={user.image || undefined}
        className="avatar-lg"
        user={user}
      />
      <div>
        <div className="flex gap-2">
          <p className="h3">{user.name}</p>
          {user.pronouns && (
            <p className="muted text-accent">{user.pronouns}</p>
          )}
        </div>
        {user.headline && <p className="p">{user.headline}</p>}
        {user.addresses && user.addresses?.length > 0 && (
          <p className="muted text-accent">
            <span>{`${user.addresses[0].suburb}, `}</span>
            <span>{`${user.addresses[0].state}, `}</span>
            <span>{`${user.addresses[0].country}`}</span>
          </p>
        )}
      </div>
      <UserCardButtons user={user} />
    </Card>
  )
}
