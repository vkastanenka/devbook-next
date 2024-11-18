// components
import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { Card } from '@/src/components/ui/card'
import { UserAvatar } from '@/src/components/ui/avatar'

// types
import { User } from '@/src/types/user-types'

interface SearchResultUserCard {
  user: User
}

export const SearchResultUserCard: React.FC<SearchResultUserCard> = ({
  user,
}) => {
  return (
    <Card className="card">
      <div className="flex items-center justify-between">
        <Link
          href={`/user/${user.username}`}
          className="flex items-center gap-4"
        >
          <UserAvatar user={user} className="avatar-lg" />
          <div>
            <p className="h4">{user.name}</p>
            {user.headline && (
              <p className="muted text-accent">{user.headline}</p>
            )}
          </div>
        </Link>
        {/* TODO: Remove from current user / contact */}
        <Button>Add friend</Button>
      </div>
    </Card>
  )
}
