// components
import { Card } from '@/components/primitives/card'
import { NoContentCard } from '@/components/cards/no-content/no-content-card'
import { UserEditButton } from '@/components/modules/buttons/user-edit-button'

// types
import { UserProfileCard } from '@/types/user-types'

export const UserEducationCard: React.FC<UserProfileCard> = ({
  isEditable,
  user,
}) => {
  if (!user.userEducations?.length)
    return (
      <div className="relative">
        {isEditable && <UserEditButton modalType="userEducationForm" user={user} />}
        <NoContentCard
          className="text-left"
          heading="Education"
          subheading={`This user has not provided any past education.`}
        />
      </div>
    )

  return (
    <Card className="relative">
      {isEditable && <UserEditButton modalType="userEducationForm" user={user} />}
      <div className="flex flex-col gap-4">
        <p className="h4">Education</p>
        {user.userEducations.map((education) => (
          <div key={education.id}>
            <p className="large">{education.school}</p>
            <p className="p">{education.degree}</p>
            <p className="muted text-accent">
              <span>{education.startYear}</span>
              <span>{' - '}</span>
              <span>{education.endYear || 'Present'}</span>
            </p>
          </div>
        ))}
      </div>
    </Card>
  )
}
