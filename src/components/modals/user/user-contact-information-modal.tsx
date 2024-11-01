'use client'

// components
import { Dialog, DialogContent } from '@/components/ui/dialog'

// utils
import { useModal } from '@/hooks/use-modal-store'
import Link from 'next/link'

export const UserContactInformationModal = () => {
  const { isOpen, onClose, type, data } = useModal()

  const isModalOpen = isOpen && type === 'userContactInformation'

  const { user } = data
  if (!user) return null

  if (!user && isModalOpen) {
    onClose()
    return null
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card flex flex-col gap-4">
        <div>
          <div>
            <p className="h3">Page Url</p>
          </div>
          <Link href={`http://localhost:3000/user/${user.username}`}>
            <p className="p">{`http://localhost:3000/user/${user.username}`}</p>
          </Link>
        </div>
        <div>
          <div>
            <p className="h3">Email</p>
          </div>
          <Link href={`mailto:${user.email}`}>
            <p className="p">{user.email}</p>
          </Link>
        </div>
        {user.phone && (
          <div>
            <div>
              <p className="h3">Phone Number</p>
            </div>
            <p className="p">{user.phone}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
