// components
import Link from 'next/link'
import { Card } from '@/src/components/ui/card'
import { UserAvatar } from '@/src/components/ui/avatar'

// utils
import { constrainText } from '@/src/lib/utils'

// types
import { User } from '@vkastanenka/devbook-types/dist/user'

export const CurrentUserCard: React.FC<{ currentUser: User }> = ({
  currentUser,
}) => {
  return (
    <Card>
      <Link className="button-text flex" href={`/user/${currentUser.username}`}>
        <div className="card flex flex-col gap-2">
          <UserAvatar
            user={currentUser}
            className="w-11 h-11 md:w-[72px] md:h-[72px] text-base md:text-2xl"
          />
          <div>
            <p className="h4">{constrainText(20, currentUser.name)}</p>
            {currentUser.headline && (
              <p className="muted text-accent">
                {constrainText(25, currentUser.headline)}
              </p>
            )}
          </div>
        </div>
      </Link>
    </Card>
  )
}
