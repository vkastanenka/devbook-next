// components
import { Card } from '../primitives/card'
import { CollapsibleCard } from './collapsible-card'
import { Typography } from '../ui/typography'

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
    <CollapsibleCard includeTrigger={userAbout.length > 250}>
      <div className="flex flex-col gap-4">
        <Typography.H4>About</Typography.H4>
        <div>
          <div className="flex flex-col gap-4">
            {userAbout.split('\n').map((line, i) => {
              if (line === '') {
                return <div key={i} />
              }

              return <Typography.P key={i}>{line}</Typography.P>
            })}
          </div>
        </div>
      </div>
    </CollapsibleCard>
  )
}
