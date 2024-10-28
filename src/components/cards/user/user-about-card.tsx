// components
import { Card } from '@/components/primitives/card'
import { CollapsibleContent } from '@/components/modules/collapsible-content'

interface UserAboutCard {
  userAbout?: string | null
}

export const UserAboutCard: React.FC<UserAboutCard> = ({ userAbout }) => {
  if (!userAbout)
    return (
      <Card className="flex flex-col gap-4">
        <p className="h4">About</p>
        <p className="h4">Nothing here yet!</p>
        <p className="p">{`This user hasn't written about themselves yet.`}</p>
      </Card>
    )

  return (
    <Card className="flex flex-col gap-4">
      <p className="h4">About</p>
      <CollapsibleContent includeTrigger={userAbout.length > 250}>
        <div className="flex flex-col gap-4">
          {userAbout.split('\n').map((line, i) => {
            if (line === '') {
              return <div key={i} />
            }

            return (
              <p className="p" key={i}>
                {line}
              </p>
            )
          })}
        </div>
      </CollapsibleContent>
    </Card>
  )
}
