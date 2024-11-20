'use client'

// components
import { NoContentSearchResultsCard } from '@/src/components/cards/no-content/no-content-search-results-card'
import { NoContentSearchResultCard } from '@/src/components/cards/no-content/no-content-search-result-card'
import { SearchResultUserCard } from '@/src/components/cards/search/search-result-user-card'

// utils
import { useLayoutStore } from '@/src/hooks/use-layout-store'

// types
import { User } from '@vkastanenka/devbook-types/dist/user'

interface SearchResults {
  currentUser: User
}

export const SearchResults: React.FC<SearchResults> = ({ currentUser }) => {
  const { searchDevbookResults } = useLayoutStore()

  if (!searchDevbookResults) {
    return (
      <div className="flex flex-col gap-4 md:gap-8">
        <NoContentSearchResultCard />
        <NoContentSearchResultCard />
        <NoContentSearchResultCard />
        <NoContentSearchResultCard />
        <NoContentSearchResultCard />
      </div>
    )
  }

  if (!searchDevbookResults.length) {
    return <NoContentSearchResultsCard />
  }

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      {searchDevbookResults.map((user) => (
        <SearchResultUserCard
          key={user.id}
          user={user}
          currentUser={currentUser}
        />
      ))}
    </div>
  )
}
