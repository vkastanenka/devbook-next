// components
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Avatar } from '@/components/primitives/avatar'
import { Typography } from '@/components/ui/typography'

// utils
import { getCurrentUser } from '@/actions/auth-actions'

/**
 * TODO:
 *
 * 1. Error handling for error responses
 */

export const CurrentUserCard = async () => {
  const currentUser = await getCurrentUser()
  if (!currentUser) return null

  return (
    <Card>
      <Link className="block" href={`/user/${currentUser.username}`}>
        <div className="card flex flex-col gap-4">
          <Avatar src={currentUser.image || undefined} className="avatar-lg" />
          <div>
            <Typography.H4>{currentUser.name}</Typography.H4>
            {currentUser.headline && (
              <Typography.Muted className="text-accent">
                {currentUser.headline}
              </Typography.Muted>
            )}
          </div>
        </div>
      </Link>
    </Card>
  )
}
