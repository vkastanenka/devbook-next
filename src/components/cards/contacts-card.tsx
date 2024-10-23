'use client'

// components
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { useLayoutStore } from '@/src/hooks/use-layout-store'

export const ContactsCard = () => {
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
          <Typography.H3>Meet new contacts</Typography.H3>
          <p>Click here to get started</p>
        </div>
      </button>
    </Card>
  )
}
