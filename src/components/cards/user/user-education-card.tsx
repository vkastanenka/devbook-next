// components
import { Card } from '@/components/primitives/card'
import { Separator } from '@/components/ui/separator'
import { UserEditCardButton } from '@/components/modules/buttons/user-edit-card-button'

// types
import { UserProfileCard } from '@/types/user-types'

export const UserEducationCard: React.FC<UserProfileCard> = ({
  isEditable,
  user,
}) => {
  return (
    <Card className="relative">
      {isEditable && (
        <UserEditCardButton modalType="userEducationForm" user={user} />
      )}
      <div className="flex flex-col gap-4">
        <p className="h4">Education</p>
        {user.userEducations && user.userEducations.length > 0 ? (
          user.userEducations.map((edu, i, arr) => (
            <div key={edu.id}>
              <p className="large">{edu.school}</p>
              <p className="p">{edu.degree}</p>
              <p className="muted text-accent">
                <span>{edu.startYear}</span>
                <span>{' - '}</span>
                <span>{edu.endYear || 'Present'}</span>
              </p>
              {i < arr.length - 1 && <Separator className="separator mt-4" />}
            </div>
          ))
        ) : (
          <p className="p">{`This user hasn't provided any past education.`}</p>
        )}
      </div>
    </Card>
  )
}
