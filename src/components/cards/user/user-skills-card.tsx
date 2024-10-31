'use client'

// components
import { Separator } from '@radix-ui/react-separator'
import { Card } from '@/components/ui/card'
import { NoContentCard } from '@/components/cards/no-content/no-content-card'
import { UserEditButton } from '@/components/modules/buttons/user-edit-button'

// svg
import { CircleArrowRight } from 'lucide-react'

// utils
import { useModal } from '@/hooks/use-modal-store'

// types
import { UserProfileCard } from '@/types/user-types'

const NUM_VISIBLE_SKILLS = 2

export const UserSkillsCard: React.FC<UserProfileCard> = ({
  isEditable,
  user,
}) => {
  const { onOpen } = useModal()

  if (!user.skills.length)
    return (
      <div className="relative">
        {isEditable && (
          <UserEditButton modalType="userSkillsForm" user={user} />
        )}
        <NoContentCard
          className="text-left"
          heading="Skills"
          subheading={`This user has not provided any skills.`}
        />
      </div>
    )

  return (
    <Card className="relative">
      {isEditable && <UserEditButton modalType="userSkillsForm" user={user} />}
      <div className="card">
        <div className="flex flex-col gap-4">
          <p className="h4">Skills</p>
          {user.skills
            .filter((_, i) => i < NUM_VISIBLE_SKILLS)
            .map((skill, i, arr) => (
              <div key={i} className="flex flex-col gap-4">
                <p className="large">{skill}</p>
                {i !== arr.length - 1 && <Separator className="separator" />}
              </div>
            ))}
        </div>
      </div>
      {user.skills.length > NUM_VISIBLE_SKILLS && (
        <div>
          <Separator className="separator" />
          <div className="flex justify-center py-card">
            <button
              className="is-interactive flex gap-2 items-center"
              onClick={() => onOpen('userSkills', { user })}
            >
              <p className="h4">{`Show all ${user.skills.length} skills`}</p>
              <CircleArrowRight />
            </button>
          </div>
        </div>
      )}
    </Card>
  )
}
