// components
import { Card } from '@/components/primitives/card'
import { CollapsibleContent } from '@/components/modules/collapsible-content'
import { NoContentCard } from '@/components/cards/no-content/no-content-card'
import { UserEditButton } from '@/components/modules/buttons/user-edit-button'

// svg
import { Briefcase } from 'lucide-react'

// utils
import { formatText } from '@/lib/utils'

// types
import { UserDataCard } from '@/types/user-types'

export const UserExperienceCard: React.FC<UserDataCard> = ({
  isEditable,
  user,
}) => {
  if (!user.userExperiences?.length)
    return (
      <div className="relative">
        {isEditable && <UserEditButton />}
        <NoContentCard
          className="text-left"
          heading="Experience"
          subheading={`This user has not provided any past work experience.`}
        />
      </div>
    )

  return (
    <Card className="relative">
      {isEditable && <UserEditButton />}
      <div className="flex flex-col gap-4">
        <p className="h4">Experience</p>
        {user.userExperiences.map((experience) => (
          <div key={experience.id}>
            <CollapsibleContent
              includeTrigger={experience.description.length > 100}
            >
              <div className="flex gap-4 items-center">
                <div className="min-w-6"></div>
                <div>
                  <p className="large">{experience.company}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-[2px]">
                  <Briefcase />
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="large">{experience.title}</p>
                    <p className="muted text-accent">
                      <span>{`${experience.type} `}</span>
                      <span>{experience.schedule}</span>
                    </p>
                    <p className="muted text-accent">
                      <span>{experience.startYear}</span>
                      <span>{' - '}</span>
                      <span>{experience.endYear || 'Present'}</span>
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    {formatText(experience.description)}
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </div>
        ))}
      </div>
    </Card>
  )
}
