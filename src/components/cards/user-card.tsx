// components
import Link from 'next/link'

import { Card } from '@/components/ui/card'
import { Overlay } from '@/components/utils/overlay'
import { UserDetails } from '@/components/modules/user-details'

// types
import { User } from '@/lib/types'

interface UserCard {
  user: User
}

export const UserCard: React.FC<UserCard> = ({ user }) => {
  return (
    <Card>
      <Overlay>
        <Link href={`/user/${user.username}`}>
          <div className="card">
            <UserDetails user={user} variant="lg" />
          </div>
        </Link>
      </Overlay>
    </Card>
  )
}
