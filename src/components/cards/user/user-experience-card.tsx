// components
import { Card } from '@/components/primitives/card'
import { Separator } from '@/components/ui/separator'
import { CollapsibleContent } from '@/components/modules/collapsible-content'
import { UserEditCardButton } from '@/components/modules/buttons/user-edit-card-button'

// utils
import { formatText } from '@/lib/utils'

// types
import { UserProfileCard } from '@/types/user-types'

export const UserExperienceCard: React.FC<UserProfileCard> = ({
  isEditable,
  user,
}) => {
  return (
    <Card className="relative">
      {isEditable && (
        <UserEditCardButton modalType="userExperienceForm" user={user} />
      )}

      <div className="flex flex-col gap-4">
        <p className="h4">Experience</p>
        {user.userExperiences && user.userExperiences.length > 0 ? (
          user.userExperiences.map((exp, i, arr) => (
            <div key={exp.id}>
              <CollapsibleContent
                includeTrigger={exp.description.length > 150}
              >
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
