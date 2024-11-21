'use client'

// components
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from '@/src/components/ui/dialog'
import { UserGithubReposForm } from '@/src/components/forms/user/user-github-repos-form'

// utils
import { useModal } from '@/src/hooks/use-modal-store'

export const UserGithubReposFormModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { user },
  } = useModal()
  const isModalOpen = isOpen && type === 'userGithubReposForm'
  if (!user) return null

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card flex flex-col gap-4">
        <DialogTitle>
          <p className="h3">Update Github</p>
        </DialogTitle>
        <DialogDescription></DialogDescription>
        <UserGithubReposForm user={user} />
      </DialogContent>
    </Dialog>
  )
}
