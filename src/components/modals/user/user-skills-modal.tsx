'use client'

// components
import { Separator } from '@/src/components/ui/separator'
import { Dialog, DialogContent } from '@/src/components/ui/dialog'

// utils
import { cn } from '@/src/lib/utils'
import { useModal } from '@/src/hooks/use-modal-store'

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
      <DialogContent className="bg-card flex flex-col gap-4 max-h-[75vh] overflow-scroll">
        <p className="h4">Skills</p>
        <div
          className={cn(
            'flex flex-col gap-4 max-h-[500px] overflow-y-auto',
            user.skills.length > 8 ? 'pr-4' : ''
          )}
        >
          {user.skills.map((skill, i, arr) => (
            <div key={i} className="flex flex-col gap-4">
              <p className="large">{skill}</p>
              {i !== arr.length - 1 && <Separator className="separator" />}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
