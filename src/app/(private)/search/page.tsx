'use client'

// components
import { NoContentSearchResultsCard } from '@/src/components/cards/no-content/no-content-search-results-card'
import { SearchResultUserCard } from '@/src/components/cards/search/search-result-user-card'

// utils
import { useLayoutStore } from '@/src/hooks/use-layout-store'

const SearchPage = () => {
  const { searchDevbookResults } = useLayoutStore()

  if (!searchDevbookResults?.length) {
    return <NoContentSearchResultsCard />
  }

  return (
    <div className="flex flex-col gap-8">
      {searchDevbookResults.map((user) => (
        <SearchResultUserCard key={user.id} user={user} />
      ))}
    </div>
  )
}

export default SearchPage
