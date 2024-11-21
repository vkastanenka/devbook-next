'use client'

// components
import Link from 'next/link'
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from '@/src/components/ui/dialog'
import { UserAvatar } from '@/src/components/ui/avatar'
import { ScrollArea } from '@/src/components/ui/scroll-area'

// utils
import { useModal } from '@/src/hooks/use-modal-store'

export const UserContactsModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { user },
  } = useModal()
  const isModalOpen = isOpen && type === 'userContacts'
  if (!user) return null

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card flex flex-col gap-4 max-h-[75vh] overflow-scroll">
        <DialogTitle>
          <p className="h3">Contacts</p>
        </DialogTitle>
        <DialogDescription></DialogDescription>
        {!user.contacts || (user.contacts && !user.contacts.length) ? (
          <p className="p">{`This user hasn't made any contacts.`}</p>
        ) : (
          <ScrollArea className="h-[50vh]">
            <div className={'flex flex-col gap-4 pr-5'}>
              {user.contacts?.map((contact) => (
                <div key={contact.id}>
                  <Link
                    className="button-text flex items-center gap-2"
                    href={`/user/${contact.username}`}
                    onClick={onClose}
                  >
                    <UserAvatar user={contact} />
                    <p className="p">{contact.name}</p>
                  </Link>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  )
}
