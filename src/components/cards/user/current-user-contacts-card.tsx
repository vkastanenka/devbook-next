// components
import Link from 'next/link'
import { Card } from '@/src/components/ui/card'
import { NoContentCurrentUserContactsCard } from '@/src/components/cards/no-content/no-content-current-user-contacts-card'

// utils
import { constrainText } from '@/src/lib/utils'

// types
import { User } from '@/src/types/user-types'
import { UserAvatar } from '@/src/components/ui/avatar'

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
            className="button-text flex items-center gap-2"
            href={`/user/${contact.username}`}
          >
            <UserAvatar user={contact} />
            <p className="p">{constrainText(18, contact.name)}</p>
          </Link>
        </div>
      ))}
    </Card>
  )
}
