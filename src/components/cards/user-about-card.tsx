// components
import { Card } from '@/components/primitives/card'
import { Typography } from '../ui/typography'

interface UserAboutCard {
  userAbout?: string | null
}

export const UserAboutCard: React.FC<UserAboutCard> = ({ userAbout }) => {
  return (
    <Card>
      <div className="flex flex-col gap-4">
        <Typography.H4>About</Typography.H4>
        <div>
          {userAbout ? (
            <div className="flex flex-col gap-4">
              {userAbout.split('\n').map((line, i) => {
                if (line === '') {
                  return <div key={i} />
                }

                return <Typography.P key={i}>{line}</Typography.P>
              })}
            </div>
          ) : (
            <>
              <Typography.H3>Nothing here yet!</Typography.H3>
              <Typography.P>
                {`This user hasn't written about themselves yet.`}
              </Typography.P>
            </>
          )}
        </div>
      </div>
    </Card>
  )
}
