'use client'

// components
import { Card } from '@/src/components/ui/card'
import { useLayoutStore } from '@/src/hooks/use-layout-store'

export const NoContentSearchResultsCard = () => {
  const { searchDevbookInputRef, setSearchDevbookInputValue } = useLayoutStore()

  return (
    <Card>
      <button
        className="is-interactive w-full text-center"
        onClick={() => {
          if (searchDevbookInputRef?.current) {
            searchDevbookInputRef.current.focus()
            setSearchDevbookInputValue('')
          }
        }}
      >
        <div className="card">
          <p className="h3">No current results!</p>
          <p className="p">Click here to enter another query.</p>
        </div>
      </button>
    </Card>
  )
}
