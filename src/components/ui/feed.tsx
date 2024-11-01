// components
import { NoContentCard } from '@/components/cards/no-content/no-content-card'
import { PostCard } from '@/components/cards/post/post-card'

// types
import { Post } from '@/types/post-types'
import { User } from '@/types/user-types'

interface Feed {
  currentUser: User
  posts?: Post[]
}

export const Feed: React.FC<Feed> = ({ currentUser, posts }) => {
  if (!posts || posts.length === 0) {
    return (
      <NoContentCard
        heading="Welcome to Devbook!"
        subheading="Create a post above to get started."
      />
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} currentUser={currentUser} post={post} />
      ))}
    </div>
  )
}
