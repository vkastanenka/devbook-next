// actions
import { userReadCurrentUser } from '@/src/actions/user-actions'

// components
import { NoContentCard } from '@/src/components/cards/no-content/no-content-card'
import { SearchResults } from '@/src/components/ui/search-results'

const SearchPage = async () => {
  const { data: currentUser, message } = await userReadCurrentUser({
    include: { contacts: { orderBy: { createdAt: 'desc' } } },
  })

  if (!currentUser) {
    return <NoContentCard heading="Error!" subheading={message} />
  }

  return <SearchResults currentUser={currentUser} />
}

export default SearchPage
