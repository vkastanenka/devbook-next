'use client'

// components
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Typography } from '@/components/ui/typography'

// utils
import { useModal } from '@/hooks/use-modal-store'

/**
 * TODO:
 *
 * 1. Make sure user can scroll up and down with max height
 */

export const UserSkillsModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { user },
  } = useModal()
  const isModalOpen = isOpen && type === 'userSkills'

  if (!user && isModalOpen) onClose()
  if (!user) return null

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card flex flex-col gap-4">
        <Typography.H4>Skills</Typography.H4>
        {user.skills.map((skill, i, arr) => (
          <div key={i} className="flex flex-col gap-4">
            <Typography.Large>{skill}</Typography.Large>
            {i !== arr.length - 1 && <Separator className="separator" />}
          </div>
        ))}
      </DialogContent>
    </Dialog>
  )
}
