// components
import { Card } from '../primitives/card'
import { Typography } from '../ui/typography'

// types
import { UserEducation } from '@/src/lib/types'

interface UserEducationCard {
  userEducations?: UserEducation[]
}

export const UserEducationCard: React.FC<UserEducationCard> = ({
  userEducations,
}) => {
  if (!userEducations?.length)
    return (
      <Card className="flex flex-col gap-4">
        <Typography.H4>Education</Typography.H4>
        <Typography.H4>Nothing here yet!</Typography.H4>
        <Typography.P>
          {`This user hasn't provided any past education.`}
        </Typography.P>
      </Card>
    )

  return (
    <Card>
      <div className="flex flex-col gap-4">
        <Typography.H4>Education</Typography.H4>
        {userEducations.map((education) => (
          <div key={education.id}>
            <Typography.Large>{education.school}</Typography.Large>
            <Typography.P>{education.degree}</Typography.P>
            <Typography.Muted className="text-accent">
              <span>{education.startYear}</span>
              <span>{' - '}</span>
              <span>{education.endYear || 'Present'}</span>
            </Typography.Muted>
          </div>
        ))}
      </div>
    </Card>
  )
}
