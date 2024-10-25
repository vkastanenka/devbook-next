'use client'

// components
import { Separator } from '../ui/separator'
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
  const { isOpen, onClose, type, data } = useModal()

  const isModalOpen = isOpen && type === 'userSkills'

  const { skills } = data
  if (!skills?.length) return null

  if (!skills?.length && isModalOpen) {
    onClose()
    return null
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card flex flex-col gap-4">
        <Typography.H4>Skills</Typography.H4>
        {skills.map((skill, i, arr) => (
          <div key={i} className="flex flex-col gap-4">
            <Typography.Large>{skill}</Typography.Large>
            {i !== arr.length - 1 && <Separator className="separator" />}
          </div>
        ))}
      </DialogContent>
    </Dialog>
  )
}
