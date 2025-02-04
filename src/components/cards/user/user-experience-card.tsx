// components
import { Card } from '@/src/components/ui/card'
import { Separator } from '@/src/components/ui/separator'
import { CollapsibleContent } from '@/src/components/ui/collapsible-content'
import { UserEditProfileCardButton } from '@/src/components/buttons/user/user-edit-profile-card-button'

// utils
import { formatText } from '@/src/lib/utils'

// types
import { User } from '@vkastanenka/devbook-types/dist/user'

interface UserExperienceCard {
  isCurrentUser?: boolean
  isEditable?: boolean
  user: User
}

export const UserExperienceCard: React.FC<UserExperienceCard> = ({
  isCurrentUser,
  isEditable,
  user,
}) => {
  return (
    <Card className="card relative">
      {isCurrentUser && isEditable && (
        <UserEditProfileCardButton modalType="userExperienceForm" user={user} />
      )}

      <div className="flex flex-col gap-4">
        <p className="h4">Experience</p>
        {user.userExperiences && user.userExperiences.length > 0 ? (
          user.userExperiences.map((exp, i, arr) => (
            <div key={exp.id}>
              <CollapsibleContent includeTrigger={exp.description.length > 150}>
                <p className="large">{exp.company}</p>
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="large">{exp.title}</p>
                    <p className="muted text-accent">
                      <span>{`${exp.type} `}</span>
                      <span>{exp.schedule}</span>
                    </p>
                    <p className="muted text-accent">
                      <span>{exp.startYear}</span>
                      <span>{' - '}</span>
                      <span>{exp.endYear || 'Present'}</span>
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    {formatText(exp.description)}
                  </div>
                </div>
              </CollapsibleContent>
              {i < arr.length - 1 && <Separator className="separator mt-4" />}
            </div>
          ))
        ) : (
          <p className="p">{`This user hasn't provided any past experience.`}</p>
        )}
      </div>
    </Card>
  )
}
