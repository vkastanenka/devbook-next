// components
import Link from 'next/link'
import { Card } from '@/src/components/ui/card'
import { UserAvatar } from '@/src/components/ui/avatar'
import { SearchToggleContactButton } from '@/src/components/buttons/search/search-toggle-contact-button'

// types
import { User } from '@/src/types/user-types'

interface SearchResultUserCard {
  user: User
  currentUser: User
}

export const SearchResultUserCard: React.FC<SearchResultUserCard> = ({
  user,
  currentUser,
}) => {
  return (
    <Card className="card">
      <div className="flex items-center justify-between">
        <Link
          href={`/user/${user.username}`}
          className="button-text flex items-center gap-4"
        >
          <UserAvatar user={user} className="avatar-lg" />
          <div>
            <p className="h4">{user.name}</p>
            {user.headline && (
              <p className="muted text-accent">{user.headline}</p>
            )}
          </div>
        </Link>
        <SearchToggleContactButton user={user} currentUser={currentUser} />
      </div>
    </Card>
  )
}
