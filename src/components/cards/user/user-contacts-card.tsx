'use client'

// components
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'

// utils
import { cn } from '@/lib/utils'
import { useModal } from '@/hooks/use-modal-store'

// types
import { User } from '@/types/user-types'

export const UserContactsCard: React.FC<{ user: User }> = ({ user }) => {
  const { onOpen } = useModal()

  let renderedContacts = user.contacts || []

  if (renderedContacts.length > 3) {
    renderedContacts = renderedContacts.slice(2)
  }

  return (
    <Card className="card flex flex-col gap-4">
      <p className="h4">Contacts</p>
      {renderedContacts.length > 0 ? (
        <div className="flex flex-col gap-2 items-end">
          <div
            className={cn(
              'w-full',
              renderedContacts.length > 0 && 'grid grid-cols-3 gap-4'
            )}
          >
            {renderedContacts.map((contact) => {
              // TODO: Refactor into function to use globally
              const contactNameSplit = contact.name.toUpperCase().split(' ')
              const fallbackText = `${contactNameSplit[0][0]}${contactNameSplit[1][0]}`

              return (
                <div key={contact.id} className="col-span-1">
                  <Link
                    href={`/user/${contact.username}`}
                    className="flex flex-col gap-1"
                  >
                    <AspectRatio ratio={1}>
                      <div className="h-full bg-primary flex items-center justify-center pointer-events-none">
                        <p className="h4">{fallbackText}</p>
                      </div>
                    </AspectRatio>
                    <p className="p">{contact.name}</p>
                  </Link>
                </div>
              )
            })}
          </div>
          <button
            className="muted text-accent"
            onClick={() => onOpen('userContacts', { user })}
          >
            see more
          </button>
        </div>
      ) : (
        <p className="p">{`This user hasn't made any contacts yet.`}</p>
      )}
    </Card>
  )
}
