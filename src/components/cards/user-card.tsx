// components
import Link from 'next/link'

import { Card } from '@/components/ui/card'
import { UserDetails } from '@/components/primitives/user-details'

// types
import { User } from '@/lib/types'

interface UserCard {
  user: User
}

export const UserCard: React.FC<UserCard> = ({ user }) => {
  return (
    <Card>
      <Link className='block' href={`/user/${user.username}`}>
        <div className="card">
          <UserDetails user={user} variant="lg" />
        </div>
      </Link>
    </Card>
  )
}
