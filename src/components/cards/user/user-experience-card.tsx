// components
import { Card } from '@/components/primitives/card'
import { CollapsibleContent } from '@/components/modules/collapsible-content'
import { Typography } from '@/components/ui/typography'
import { UserEditButton } from '@/components/modules/buttons/user-edit-button'

// svg
import { Briefcase } from 'lucide-react'

// types
import { UserExperience } from '@/types/user-types'

interface UserExperienceCard {
  canEdit?: boolean
  userExperiences?: UserExperience[]
}

export const UserExperienceCard: React.FC<UserExperienceCard> = ({
  canEdit,
  userExperiences,
}) => {
  if (!userExperiences?.length)
    return (
      <Card className="flex flex-col gap-4">
        <Typography.H4>Experience</Typography.H4>
        <Typography.H4>Nothing here yet!</Typography.H4>
        <Typography.P>
          {`This user hasn't provided any past work experience.`}
        </Typography.P>
      </Card>
    )

  return (
    <Card className="relative">
      {canEdit && <UserEditButton />}
      <div className="flex flex-col gap-4">
        <Typography.H4>Experience</Typography.H4>
        {userExperiences.map((experience) => (
          <div key={experience.id}>
            <CollapsibleContent
              includeTrigger={experience.description.length > 100}
            >
              <div className="flex gap-4 items-center">
                <div className="min-w-6"></div>
                <div>
                  <Typography.Large>{experience.company}</Typography.Large>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-[2px]">
                  <Briefcase />
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <Typography.Large>{experience.title}</Typography.Large>
                    <Typography.Muted className="text-accent">
                      <span>{`${experience.type} `}</span>
                      <span>{experience.schedule}</span>
                    </Typography.Muted>
                    <Typography.Muted className="text-accent">
                      <span>{experience.startYear}</span>
                      <span>{' - '}</span>
                      <span>{experience.endYear || 'Present'}</span>
                    </Typography.Muted>
                  </div>
                  <div className="flex flex-col gap-4">
                    {experience.description.split('\n').map((line, i) => {
                      if (line === '') {
                        return <div key={i} />
                      }
                      return <Typography.P key={i}>{line}</Typography.P>
                    })}
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
