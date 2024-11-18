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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <Link
          href={`/user/${user.username}`}
          className="button-text flex items-center gap-2 md:gap-4"
        >
          <UserAvatar
            user={user}
            className="w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14"
          />
          <div>
            <p className="h4">{user.name}</p>
            {user.headline && (
              <p className="muted text-accent">{user.headline}</p>
            )}
          </div>
        </Link>
        <SearchToggleContactButton
          className="w-full sm:w-auto"
          user={user}
          currentUser={currentUser}
        />
      </div>
    </Card>
  )
}
