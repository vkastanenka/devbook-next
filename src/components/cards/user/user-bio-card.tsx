// components
import { Card } from '@/components/primitives/card'
import { CollapsibleContent } from '@/components/modules/collapsible-content'
import { UserEditCardButton } from '@/components/modules/buttons/user-edit-card-button'

// utils
import { formatText } from '@/lib/utils'

// types
import { UserProfileCard } from '@/types/user-types'

export const UserBioCard: React.FC<UserProfileCard> = ({
  isEditable,
  user,
}) => {
  return (
    <Card className="flex flex-col gap-4 relative">
      {isEditable && <UserEditCardButton modalType="userBioForm" user={user} />}
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
