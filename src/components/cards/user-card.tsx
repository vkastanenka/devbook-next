// components
import { Card } from '@/components/primitives/card'
import { UserDetails } from '@/components/primitives/user-details'

// types
import { User } from '@/lib/types'

interface UserCard {
  user: User
}

export const UserCard: React.FC<UserCard> = ({ user }) => {
  return (
    <Card>
      <UserDetails user={user} variant="xl" />
    </Card>
  )
}
