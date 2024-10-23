'use client'

// components
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { useLayoutStore } from '@/src/hooks/use-layout-store'

export const NoSearchDevbookResultsCard = () => {
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
          <Typography.H3>No current results!</Typography.H3>
          <Typography.P>Click here to enter another query.</Typography.P>
        </div>
      </button>
    </Card>
  )
}
