// components
import { Card } from '@/components/ui/card'
import { CollapsibleContent } from '@/components/ui/collapsible-content'
import { UserEditProfileCardButton } from '@/components/buttons/user/user-edit-profile-card-button'

// utils
import { formatText } from '@/lib/utils'

// types
// import { UserProfileCard } from '@/types/user-types'

// export const UserBioCard: React.FC<UserProfileCard> = ({
export const UserBioCard = ({
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
