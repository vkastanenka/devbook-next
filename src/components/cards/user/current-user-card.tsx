// components
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Avatar } from '@/components/primitives/avatar'

// utils
import { getCurrentUser } from '@/actions/user-actions'

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
            <p className="h4">{currentUser.name}</p>
            {currentUser.headline && (
              <p className="muted text-accent">{currentUser.headline}</p>
            )}
          </div>
        </div>
      </Link>
    </Card>
  )
}
