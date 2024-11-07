// components
import { Card } from '@/src/components/ui/card'
import { Separator } from '@/src/components/ui/separator'
import { UserEditProfileCardButton } from '@/src/components/buttons/user/user-edit-profile-card-button'

// types
import { User } from '@/src/types/user-types'

interface UserEducationCard {
  isCurrentUser?: boolean
  isEditable?: boolean
  user: User
}

export const UserEducationCard: React.FC<UserEducationCard> = ({
  isCurrentUser,
  isEditable,
  user,
}) => {
  return (
    <Card className="card relative">
      {isCurrentUser && isEditable && (
        <UserEditProfileCardButton modalType="userEducationForm" user={user} />
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
