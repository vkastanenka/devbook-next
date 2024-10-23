// components
import Link from 'next/link'

import { Card } from '@/components/ui/card'
import { UserDetails } from '@/components/primitives/user-details'

// types
import { User } from '@/lib/types'

interface CurrentUserCard {
  currentUser: User
}

export const CurrentUserCard: React.FC<CurrentUserCard> = ({ currentUser }) => {
  return (
    <Card>
      <Link className='block' href={`/user/${currentUser.username}`}>
        <div className="card">
          <UserDetails user={currentUser} variant="lg" />
        </div>
      </Link>
    </Card>
  )
}
