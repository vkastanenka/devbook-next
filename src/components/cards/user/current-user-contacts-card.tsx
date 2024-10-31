// components
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { NoContentCurrentUserContactsCard } from '@/components/cards/no-content/no-content-current-user-contacts-card'

// types
import { User } from '@/types/user-types'
import { UserAvatar } from '../../ui/avatar'

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
      {currentUser.contacts?.map((contact) => (
        <div key={contact.id}>
          <Link
            className="flex items-center gap-2"
            href={`/user/${contact.username}`}
          >
            <UserAvatar src={contact.image || undefined} user={contact} />
            <p className="p">{contact.name}</p>
          </Link>
        </div>
      ))}
    </Card>
  )
}
