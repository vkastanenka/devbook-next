// components
import { Card } from '@/components/primitives/card'
import { CollapsibleContent } from '@/components/modules/collapsible-content'
import { Typography } from '@/components/ui/typography'

interface UserAboutCard {
  userAbout?: string | null
}

export const UserAboutCard: React.FC<UserAboutCard> = ({ userAbout }) => {
  if (!userAbout)
    return (
      <Card className="flex flex-col gap-4">
        <Typography.H4>About</Typography.H4>
        <Typography.H4>Nothing here yet!</Typography.H4>
        <Typography.P>
          {`This user hasn't written about themselves yet.`}
        </Typography.P>
      </Card>
    )

  return (
    <Card className="flex flex-col gap-4">
      <Typography.H4>About</Typography.H4>
      <CollapsibleContent includeTrigger={userAbout.length > 250}>
        <div className="flex flex-col gap-4">
          {userAbout.split('\n').map((line, i) => {
            if (line === '') {
              return <div key={i} />
            }

            return <Typography.P key={i}>{line}</Typography.P>
          })}
        </div>
      </CollapsibleContent>
    </Card>
  )
}
