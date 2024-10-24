// components
import { NoContentCard } from '@/components/cards/no-content-card'

// types
// import { User } from '@/lib/types'

export const UserFeed: React.FC = () => {
  return (
    <NoContentCard
      heading="Welcome to Devbook!"
      subheading="Create a post above to get started."
    />
  )
}
