// components
import { Card } from '@/components/primitives/card'
import { SearchDevbookUserResult } from '@/components/modules/search-devbook-user-result'

// types
import { User } from '@/lib/types'

interface SearchDevbookuserResultCard {
  user: User
}

export const SearchDevbookUserResultCard: React.FC<
  SearchDevbookuserResultCard
> = ({ user }) => {
  return (
    <Card>
      <SearchDevbookUserResult user={user} />
    </Card>
  )
}
