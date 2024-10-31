'use client'

// components
import { Separator } from '@radix-ui/react-separator'
import { Card } from '@/components/ui/card'
import { UserEditCardButton } from '@/components/modules/buttons/user-edit-card-button'

// svg
import { CircleArrowRight } from 'lucide-react'

// utils
import { useModal } from '@/hooks/use-modal-store'

// types
import { UserProfileCard } from '@/types/user-types'

const NUM_VISIBLE_SKILLS = 2

export const UserSkillsCard: React.FC<UserProfileCard> = ({
  isCurrentUser,
  isEditable,
  user,
}) => {
  const { onOpen } = useModal()

  return (
    <Card className="relative">
      {isCurrentUser && isEditable && (
        <UserEditCardButton modalType="userSkillsForm" user={user} />
      )}
      <div className="card">
        <div className="flex flex-col gap-4">
          <p className="h4">Skills</p>
          {user.skills.length > 0 ? (
            user.skills
              .filter((_, i) => i < NUM_VISIBLE_SKILLS)
              .map((skill, i, arr) => (
                <div key={i} className="flex flex-col gap-4">
                  <p className="large">{skill}</p>
                  {i !== arr.length - 1 && <Separator className="separator" />}
                </div>
              ))
          ) : (
            <p className="p">{`This user has not provided any skills.`}</p>
          )}
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
