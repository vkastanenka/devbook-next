'use client'

// components
import Link from 'next/link'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { UserAvatar } from '@/components/ui/avatar'

// utils
import { useModal } from '@/hooks/use-modal-store'

export const UserContactsModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { user },
  } = useModal()
  const isModalOpen = isOpen && type === 'userContacts'

  if (!user && isModalOpen) onClose()
  if (!user) return null

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card flex flex-col gap-4 max-h-[75vh] overflow-scroll">
        <p className="h4">Contacts</p>
        {!user.contacts || (user.contacts && !user.contacts.length) ? (
          <p className="p">{`This user hasn't made any contacts.`}</p>
        ) : (
          <div className={'flex flex-col gap-4 max-h-[500px] overflow-y-auto'}>
            {user.contacts?.map((contact) => (
              <div key={contact.id}>
                <Link
                  className="flex items-center gap-2"
                  href={`/user/${contact.username}`}
                  onClick={onClose}
                >
                  <UserAvatar user={contact} />
                  <p className="p">{contact.name}</p>
                </Link>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
