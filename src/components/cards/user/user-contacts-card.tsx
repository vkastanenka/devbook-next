'use client'

// components
import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/src/components/ui/card'
import { AspectRatio } from '@/src/components/ui/aspect-ratio'
import { UserOpenUserContactsModalButton } from '@/src/components/buttons/user/user-open-user-contacts-modal-button'

// utils
import { cn, formatUserInitials } from '@/src/lib/utils'

// types
import { User } from '@vkastanenka/devbook-types/dist/user'

const NUM_VISIBLE_CONTACTS = 3

interface UserContactsCard {
  user: User
}

export const UserContactsCard: React.FC<UserContactsCard> = ({ user }) => {
  let renderedContacts = user.contacts || []

  if (renderedContacts.length > NUM_VISIBLE_CONTACTS) {
    renderedContacts = renderedContacts.slice(0, NUM_VISIBLE_CONTACTS)
  }

  return (
    <Card className="card flex flex-col gap-4">
      <p className="h4">Contacts</p>
      {renderedContacts.length > 0 ? (
        <div className="flex flex-col gap-2 items-end">
          <div
            className={cn(
              'w-full',
              renderedContacts.length > 0 && 'grid grid-cols-3 gap-2 md:gap-4'
            )}
          >
            {renderedContacts.map((contact) => {
              return (
                <div key={contact.id} className="col-span-1">
                  <Link
                    href={`/user/${contact.username}`}
                    className="button-text flex flex-col"
                  >
                    <AspectRatio ratio={1}>
                      <div className="h-full bg-primary text-primary-foreground flex items-center justify-center pointer-events-none rounded-md">
                        {contact.image ? (
                          <Image
                            className="rounded-md"
                            fill
                            alt={contact.username}
                            src={contact.image}
                          />
                        ) : (
                          <p className="h4">
                            {formatUserInitials(contact.name)}
                          </p>
                        )}
                      </div>
                    </AspectRatio>
                    <p className="p">{contact.name}</p>
                  </Link>
                </div>
              )
            })}
          </div>
          {user.contacts && user.contacts.length > NUM_VISIBLE_CONTACTS ? (
            <UserOpenUserContactsModalButton user={user} />
          ) : null}
        </div>
      ) : (
        <p className="p">{`This user hasn't made any contacts yet.`}</p>
      )}
    </Card>
  )
}
