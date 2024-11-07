// components
import { Card } from '@/src/components/ui/card'
import { CollapsibleContent } from '@/src/components/ui/collapsible-content'
import { UserEditProfileCardButton } from '@/src/components/buttons/user/user-edit-profile-card-button'

// utils
import { formatText } from '@/src/lib/utils'

// types
import { User } from '@/src/types/user-types'

interface UserBioCard {
  isCurrentUser?: boolean
  isEditable?: boolean
  user: User
}

export const UserBioCard: React.FC<UserBioCard> = ({
  isCurrentUser,
  isEditable,
  user,
}) => {
  return (
    <Card className="card flex flex-col gap-4 relative">
      {isCurrentUser && isEditable && (
        <UserEditProfileCardButton modalType="userBioForm" user={user} />
      )}
      <p className="h4">Bio</p>
      {user.bio ? (
        <CollapsibleContent includeTrigger={user.bio.length > 250}>
          <div className="flex flex-col gap-4">{formatText(user.bio)}</div>
        </CollapsibleContent>
      ) : (
        <p className="p">{`This user hasn't written about themselves yet.`}</p>
      )}
    </Card>
  )
}
