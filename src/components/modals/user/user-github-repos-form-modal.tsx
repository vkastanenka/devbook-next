'use client'

// components
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { UserGithubReposForm } from '@/components/forms/user/user-github-repos-form'

// utils
import { useModal } from '@/hooks/use-modal-store'

export const UserGithubReposFormModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { user },
  } = useModal()
  const isModalOpen = isOpen && type === 'userGithubReposForm'

  if (!user && isModalOpen) onClose()
  if (!user) return null

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card flex flex-col gap-4">
        <p className="h3">Update Github</p>
        <UserGithubReposForm user={user} />
      </DialogContent>
    </Dialog>
  )
}
