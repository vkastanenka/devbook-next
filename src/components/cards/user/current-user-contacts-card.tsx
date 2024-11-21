// components
import Link from 'next/link'
import { Card } from '@/src/components/ui/card'
import { NoContentCurrentUserContactsCard } from '@/src/components/cards/no-content/no-content-current-user-contacts-card'
import { UserAvatar } from '@/src/components/ui/avatar'
import { UserOpenUserContactsModalButton } from '@/src/components/buttons/user/user-open-user-contacts-modal-button'

// utils
import { constrainText } from '@/src/lib/utils'

// types
import { User } from '@vkastanenka/devbook-types/dist/user'

export const CurrentUserContactsCard: React.FC<{ currentUser: User }> = async ({
  currentUser,
}) => {
  if (
    !currentUser.contacts ||
    (currentUser.contacts && !currentUser.contacts.length)
  ) {
    return <NoContentCurrentUserContactsCard />
  }

  return (
    <Card className="card flex flex-col gap-4">
      <p className="h3">Contacts</p>
      {currentUser.contacts?.slice(0, 6).map((contact) => (
        <div className="flex flex-col gap-4" key={contact.id}>
          <Link
            className="button-text gap-2"
            href={`/user/${contact.username}`}
          >
            <UserAvatar user={contact} />
            <p className="p">{constrainText(18, contact.name)}</p>
          </Link>
        </div>
      ))}
      {currentUser.contacts.length > 6 ? (
        <UserOpenUserContactsModalButton user={currentUser} />
      ) : null}
    </Card>
  )
}
