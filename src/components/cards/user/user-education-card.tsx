// components
import { Card } from '@/components/primitives/card'
import { Typography } from '@/components/ui/typography'
import { UserEditButton } from '@/components/modules/buttons/user-edit-button'

// types
import { UserEducation } from '@/types/user-types'

interface UserEducationCard {
  canEdit?: boolean
  userEducations?: UserEducation[]
}

export const UserEducationCard: React.FC<UserEducationCard> = ({
  canEdit,
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
    <Card className="relative">
      {canEdit && <UserEditButton />}
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
