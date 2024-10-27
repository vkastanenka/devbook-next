// components
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/primitives/card'
// import { UserDetails } from '@/components/primitives/user-details'

// types
import { User } from '@/types/user-types'

interface SearchResultUserCard {
  user: User
}

export const SearchResultUserCard: React.FC<SearchResultUserCard> = ({
  user,
}) => {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <Link href={`/user/${user.username}`}>
          {/* <UserDetails user={user} variant="sm" /> */}
        </Link>
        <Button>Add friend</Button>
      </div>
    </Card>
  )
}
