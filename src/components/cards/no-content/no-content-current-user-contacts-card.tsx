'use client'

// components
import { Card } from '@/src/components/ui/card'

// utils
import { useLayoutStore } from '@/src/hooks/use-layout-store'

export const NoContentCurrentUserContactsCard = () => {
  const { searchDevbookInputRef } = useLayoutStore()

  return (
    <Card>
      <button
        className="button-text w-full text-left"
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
