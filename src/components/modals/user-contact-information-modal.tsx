'use client'

// components
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Typography } from '@/components/ui/typography'

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
            <Typography.H3>Page Url</Typography.H3>
          </div>
          <Link href={`http://localhost:3000/user/${user.username}`}>
            <Typography.P>{`http://localhost:3000/user/${user.username}`}</Typography.P>
          </Link>
        </div>
        <div>
          <div>
            <Typography.H3>Email</Typography.H3>
          </div>
          <Link href={`mailto:${user.email}`}>
            <Typography.P>{user.email}</Typography.P>
          </Link>
        </div>
        {user.phone && (
          <div>
            <div>
              <Typography.H3>Phone Number</Typography.H3>
            </div>
            <Typography.P>{user.phone}</Typography.P>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
