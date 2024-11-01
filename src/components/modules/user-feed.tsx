// components
import { NoContentCard } from '@/components/cards/no-content/no-content-card'

// types
import { Post } from '@/types/post-types'

interface UserFeed {
  posts?: Post[]
}

export const UserFeed: React.FC<UserFeed> = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return (
      <NoContentCard
        heading="Welcome to Devbook!"
        subheading="Create a post above to get started."
      />
    )
  }

  return (
    <NoContentCard
      heading="We've got posts!"
      subheading="This user has posts on their model."
    />
  )
}
