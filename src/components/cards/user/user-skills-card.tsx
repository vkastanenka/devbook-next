'use client'

// components
import { Card } from '@/src/components/ui/card'
import { Separator } from '@/src/components/ui/separator'
import { UserEditProfileCardButton } from '@/src/components/buttons/user/user-edit-profile-card-button'

// svg
import { CircleArrowRight } from 'lucide-react'

// utils
import { useModal } from '@/src/hooks/use-modal-store'

// types
import { User } from '@/src/types/user-types'

const NUM_VISIBLE_SKILLS = 2

interface UserSkillsCard {
  isCurrentUser?: boolean
  isEditable?: boolean
  user: User
}

export const UserSkillsCard: React.FC<UserSkillsCard> = ({
  isCurrentUser,
  isEditable,
  user,
}) => {
  const { onOpen } = useModal()

  return (
    <Card className="relative">
      {isCurrentUser && isEditable && (
        <UserEditProfileCardButton modalType="userSkillsForm" user={user} />
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
