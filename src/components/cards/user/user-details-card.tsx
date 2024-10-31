// components
import { Card } from '@/components/ui/card'
import { UserAvatar } from '@/components/ui/avatar'
import { UserCardButtons } from '@/components/modules/user-card-buttons'
import { UserEditCardButton } from '@/components/modules/buttons/user-edit-card-button'
import { UserEditContactButton } from '@/components/modules/buttons/user-edit-contact-button'

// types
import { UserDetailsCard as UserDetailsCardProps } from '@/types/user-types'

export const UserDetailsCard: React.FC<UserDetailsCardProps> = ({
  currentUser,
  isContact,
  isCurrentUser,
  isEditable,
  user,
}) => {
  return (
    <Card className="card flex flex-col gap-2 relative">
      {isCurrentUser && isEditable && (
        <UserEditCardButton modalType="userDetailsForm" user={user} />
      )}
      {!isCurrentUser && (
        <UserEditContactButton
          currentUser={currentUser}
          isContact={isContact}
          user={user}
        />
      )}
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
