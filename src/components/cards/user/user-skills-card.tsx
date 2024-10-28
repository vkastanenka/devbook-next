'use client'

// components
import { Separator } from '@radix-ui/react-separator'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { UserEditButton } from '@/components/modules/buttons/user-edit-button'

// svg
import { CircleArrowRight } from 'lucide-react'

// utils
import { useModal } from '@/hooks/use-modal-store'

interface UserSkillCard {
  canEdit?: boolean
  userSkills: string[]
}

export const UserSkillsCard: React.FC<UserSkillCard> = ({
  canEdit,
  userSkills,
}) => {
  const { onOpen } = useModal()

  if (!userSkills?.length)
    return (
      <Card className="flex flex-col gap-4">
        <Typography.H4>Skills</Typography.H4>
        <Typography.H4>Nothing here yet!</Typography.H4>
        <Typography.P>{`This user hasn't provided any skills.`}</Typography.P>
      </Card>
    )

  const shownSkills =
    userSkills.length > 2 ? [userSkills[0], userSkills[1]] : userSkills

  return (
    <Card className="relative">
      {canEdit && <UserEditButton />}
      <div className="card">
        <div className="flex flex-col gap-4">
          <Typography.H4>Skills</Typography.H4>
          {shownSkills.map((skill, i, arr) => (
            <div key={i} className="flex flex-col gap-4">
              <Typography.Large>{skill}</Typography.Large>
              {i !== arr.length - 1 && <Separator className="separator" />}
            </div>
          ))}
        </div>
      </div>
      {userSkills.length > 2 && (
        <div>
          <Separator className="separator" />
          <div className="flex justify-center py-card">
            <button
              className="is-interactive flex gap-2 items-center"
              onClick={() => onOpen('userSkills', { skills: userSkills })}
            >
              <Typography.H4>{`Show all ${userSkills.length} skills`}</Typography.H4>
              <CircleArrowRight />
            </button>
          </div>
        </div>
      )}
    </Card>
  )
}
