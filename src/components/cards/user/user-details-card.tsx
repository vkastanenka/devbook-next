// components
import { Card } from '@/components/ui/card'
import { UserAvatar } from '@/components/ui/avatar'
import { UserDetailsCardButtons } from '@/components/buttons/user/user-details-card-buttons'
import { UserEditContactButton } from '@/components/buttons/user/user-edit-contact-button'
import { UserEditProfileCardButton } from '@/components/buttons/user/user-edit-profile-card-button'

// types
import { User } from '@/types/user-types'

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
  // Check if user is current user
  const isCurrentUser = currentUser.id === user.id

  // Check if current user in user contacts // TODO: Better implementation
  let isContact
  if (!isCurrentUser && user.contacts && user.contacts.length > 0) {
    user.contacts.every((contact) => {
      if (contact.id === currentUser.id) {
        isContact = true
        return false
      }
      return true
    })
  }

  return (
    <Card className="card flex flex-col gap-2 relative">
      {isCurrentUser && isEditable && (
        <UserEditProfileCardButton modalType="userDetailsForm" user={currentUser} />
      )}
      {!isCurrentUser && (
        <UserEditContactButton
          currentUser={currentUser}
          isContact={isContact}
          user={user}
        />
      )}
      <UserAvatar className="avatar-lg" user={user} />
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
      <UserDetailsCardButtons user={user} />
    </Card>
  )
}
