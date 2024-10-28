'use client'

// components
import { Card } from '@/components/ui/card'
import { useLayoutStore } from '@/src/hooks/use-layout-store'

export const CurrentUserContactsCard = () => {
  const { searchDevbookInputRef } = useLayoutStore()

  return (
    <Card>
      <button
        className="is-interactive w-full text-left"
        onClick={() => {
          if (searchDevbookInputRef?.current) {
            searchDevbookInputRef.current.focus()
          }
        }}
      >
        <div className="card">
          <p className="h3">Meet new contacts</p>
          <p className="p">Click here to get started</p>
        </div>
      </button>
    </Card>
  )
}
