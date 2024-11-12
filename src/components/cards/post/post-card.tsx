// components
import { Card } from '@/src/components/ui/card'
import { PostUser, PostBody, PostActivity } from '@/src/components/ui/post'
import { PostActionButtons } from '@/src/components/buttons/post/post-action-buttons'
import { PostCurrentUserOptionsButtons } from '@/src/components/buttons/post/post-current-user-options-buttons'
import { Separator } from '@/src/components/ui/separator'

// types
import { Post } from '@/src/types/post-types'
import { User } from '@/src/types/user-types'

interface PostCard {
  post: Post
  currentUser: User
  onDeleteRedirectPath?: string
}

export const PostCard: React.FC<PostCard> = ({
  post,
  currentUser,
  onDeleteRedirectPath,
}) => {
  return (
    <Card className="relative py-card bg-card flex flex-col gap-4">
      <PostCurrentUserOptionsButtons
        post={post}
        currentUser={currentUser}
        onDeleteRedirectPath={onDeleteRedirectPath}
      />
      <PostUser className="px-card" post={post} />
      <PostBody className="px-card" post={post} />
      <PostActivity className="px-card" post={post} />
      <Separator />
      <PostActionButtons
        className="px-card"
        post={post}
        currentUser={currentUser}
      />
    </Card>
  )
}
