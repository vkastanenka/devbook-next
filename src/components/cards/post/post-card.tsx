// components
import { Card } from '@/src/components/ui/card'
import { PostUser, PostBody, PostActivity } from '@/src/components/ui/post'
import { PostActionButtons } from '@/src/components/buttons/post/post-action-buttons'
import { PostCurrentUserOptionsButtons } from '@/src/components/buttons/post/post-current-user-options-buttons'
import { Separator } from '@/src/components/ui/separator'

// types
import { Post } from '@vkastanenka/devbook-types/dist/post'
import { User } from '@vkastanenka/devbook-types/dist/user'

interface PostCard {
  isCurrentPost?: boolean
  post: Post
  currentUser: User
  onDeleteRedirectPath?: string
}

export const PostCard: React.FC<PostCard> = ({
  isCurrentPost,
  post,
  currentUser,
  onDeleteRedirectPath,
}) => {
  return (
    <Card className="relative py-4 md:py-card bg-card flex flex-col gap-4">
      {post.userId === currentUser.id && (
        <PostCurrentUserOptionsButtons
          post={post}
          currentUser={currentUser}
          onDeleteRedirectPath={onDeleteRedirectPath}
          className="absolute top-4 right-4"
        />
      )}
      <PostUser className="px-4 md:px-card" post={post} isCurrentPost={isCurrentPost} />
      <PostBody className="px-4 md:px-card" post={post} />
      <PostActivity className="px-4 md:px-card" post={post} />
      <Separator />
      <PostActionButtons
        className="px-4 lg:px-card"
        post={post}
        currentUser={currentUser}
      />
    </Card>
  )
}
