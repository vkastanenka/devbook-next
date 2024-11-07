// components
import { NoContentCard } from '@/src/components/cards/no-content/no-content-card'
import { PostCard } from '@/src/components/cards/post/post-card'

// types
import { Post } from '@/src/types/post-types'
import { User } from '@/src/types/user-types'

interface Feed {
  isCurrentUser?: boolean
  posts?: Post[]
  user: User
}

export const Feed: React.FC<Feed> = ({ isCurrentUser, user, posts }) => {
  if (!posts || posts.length === 0) {
    if (isCurrentUser) {
      return (
        <NoContentCard
          heading="Welcome to Devbook!"
          subheading="Create a post above to get started."
        />
      )
    } else {
      return (
        <NoContentCard
          heading="Looks a little empty!"
          subheading="This user hasn't posted anything yet."
        />
      )
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} user={user} />
      ))}
    </div>
  )
}
