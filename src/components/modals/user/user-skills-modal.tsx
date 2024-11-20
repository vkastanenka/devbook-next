'use client'

// components
import { Separator } from '@/src/components/ui/separator'
import { Dialog, DialogContent } from '@/src/components/ui/dialog'
import { ScrollArea } from '@/src/components/ui/scroll-area'

// utils
import { useModal } from '@/src/hooks/use-modal-store'

export const UserSkillsModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { user },
  } = useModal()
  const isModalOpen = isOpen && type === 'userSkills'
  if (!user) return null

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card flex flex-col gap-4 max-h-[75vh] overflow-scroll">
        <p className="h4">Skills</p>
        <ScrollArea className="h-[40vh] md:h-[30vh]">
          <div className="flex flex-col gap-4 pr-5">
            {user.skills.map((skill, i, arr) => (
              <div key={i} className="flex flex-col gap-4">
                <p className="large">{skill}</p>
                {i !== arr.length - 1 && <Separator className="separator" />}
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
