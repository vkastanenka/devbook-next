'use client'

// components
import { NoSearchDevbookResultsCard } from '@/src/components/cards/no-search-devbook-results'
import { SearchDevbookUserResultCard } from '@/src/components/cards/search-devbook-user-result-card'

// utils
import { useLayoutStore } from '@/src/hooks/use-layout-store'

const SearchPage = () => {
  const { searchDevbookResults } = useLayoutStore()

  if (!searchDevbookResults?.length) {
    return <NoSearchDevbookResultsCard />
  }

  return (
    <div>
      {searchDevbookResults.map((user) => (
        <SearchDevbookUserResultCard key={user.id} user={user} />
      ))}
    </div>
  )
}

export default SearchPage
