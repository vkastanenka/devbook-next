// components
import { Card } from '@/src/components/ui/card'
import { UserAvatar } from '@/src/components/ui/avatar'
import { UserDetailsCardButtons } from '@/src/components/buttons/user/user-details-card-buttons'
import { UserEditContactButton } from '@/src/components/buttons/user/user-edit-contact-button'
import { UserEditProfileCardButton } from '@/src/components/buttons/user/user-edit-profile-card-button'

// utils
import { constrainText } from '@/src/lib/utils'

// types
import { User } from '@vkastanenka/devbook-types/dist/user'

interface UserDetailsCard {
  currentUser: User
  isEditable?: boolean
  user: User
}

export const UserDetailsCard: React.FC<UserDetailsCard> = ({
  currentUser,
  isEditable,
  user,
}) => {
  const isCurrentUser = currentUser.id === user.id

  return (
    <Card className="card flex flex-col gap-2 relative">
      {isCurrentUser && isEditable && (
        <UserEditProfileCardButton
          modalType="userDetailsForm"
          user={currentUser}
        />
      )}
      {!isCurrentUser && (
        <UserEditContactButton user={user} currentUser={currentUser} />
      )}
      <UserAvatar
        className="w-11 h-11 md:w-[72px] md:h-[72px] text-base md:text-2xl"
        user={user}
      />
      <div>
        <div className="flex gap-2">
          <p className="h3">{constrainText(20, user.name)}</p>
          {user.pronouns && (
            <p className="muted text-accent">{user.pronouns}</p>
          )}
        </div>
        {user.headline && (
          <p className="p">{constrainText(25, user.headline)}</p>
        )}
        {user.addresses && user.addresses?.length > 0 && (
          <p className="muted text-accent">
            <span>{`${user.addresses[0].suburb}, `}</span>
            <span>{`${user.addresses[0].state}, `}</span>
            <span>{`${user.addresses[0].country}`}</span>
          </p>
        )}
      </div>
      <UserDetailsCardButtons user={user} />
    </Card>
  )
}
