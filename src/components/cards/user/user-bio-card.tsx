// components
import { Card } from '@/components/primitives/card'
import { NoContentCard } from '@/components/cards/no-content/no-content-card'
import { CollapsibleContent } from '@/components/modules/collapsible-content'
import { UserEditButton } from '@/components/modules/buttons/user-edit-button'

// utils
import { formatText } from '@/lib/utils'

// types
import { UserProfileCard } from '@/types/user-types'

export const UserBioCard: React.FC<UserProfileCard> = ({ isEditable, user }) => {
  if (!user.bio)
    return (
      <div className="relative">
        {isEditable && <UserEditButton modalType="userBioForm" user={user} />}
        <NoContentCard
          className="text-left"
          heading="Bio"
          subheading={`This user hasn't written about themselves yet.`}
        />
      </div>
    )

  return (
    <Card className="flex flex-col gap-4 relative">
      {isEditable && <UserEditButton modalType="userBioForm" user={user} />}
      <p className="h4">Bio</p>
      <CollapsibleContent includeTrigger={user.bio.length > 250}>
        <div className="flex flex-col gap-4">{formatText(user.bio)}</div>
      </CollapsibleContent>
    </Card>
  )
}
