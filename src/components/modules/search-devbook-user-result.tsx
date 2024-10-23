// components
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { UserDetails } from '@/components/primitives/user-details'

// types
import { User } from '@/lib/types'

interface SearchDevbookuserResult {
  user: User
}

export const SearchDevbookUserResult: React.FC<SearchDevbookuserResult> = ({
  user,
}) => {
  return (
    <div className="flex items-center justify-between">
      <Link href={`/user/${user.username}`}>
        <UserDetails user={user} variant="sm" />
      </Link>
      <Button>Add friend</Button>
    </div>
  )
}
