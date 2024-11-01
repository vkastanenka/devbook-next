// components
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { PostActionButtons } from '@/components/buttons/post/post-action-buttons'
import { PostOptionButtons } from '@/components/buttons/post/post-option-buttons'
import { Separator } from '@/components/ui/separator'

// svg
import { MessageSquareText, ThumbsUp } from 'lucide-react'

// utils
import { formatText } from '@/lib/utils'

// types
import { Post } from '@/types/post-types'
import { User } from '@/types/user-types'

// images
import { UserAvatar } from '@/components/ui/avatar'

export const PostCard: React.FC<{
  currentUser: User
  post: Post
}> = ({ currentUser, post }) => {
  return (
    <Card className="relative py-card bg-card flex flex-col gap-4">
      <PostOptionButtons currentUser={currentUser} post={post} />
      <PostCardUser post={post} />
      <PostCardBody post={post} />
      <PostCardActivity post={post} />
      <Separator />
      <PostActionButtons currentUser={currentUser} post={post} />
    </Card>
  )
}

const PostCardUser: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="px-card">
      {post.user ? (
        <div className="inline-block">
          <Link
            href={`/user/${post.user.username}`}
            className="inline-flex items-center gap-2"
          >
            <UserAvatar user={post.user} />
            <div>
              <p className="p">{post.user.name}</p>
              {post.user.headline && (
                <p className="muted text-accent">{post.user.headline}</p>
              )}
            </div>
          </Link>
        </div>
      ) : (
        <p className="h4">No user on this post</p>
      )}
    </div>
  )
}

const PostCardBody: React.FC<{ post: Post }> = ({ post }) => {
  return <div className="px-card">{formatText(post.body)}</div>
}

const PostCardActivity: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="px-card">
      <div className="flex justify-between text-accent">
        <div className="flex justify-center gap-1">
          <ThumbsUp className="w-4" />
          <p className="muted">{post.postLikes ? post.postLikes.length : 0}</p>
        </div>
        <div className="flex justify-center gap-1">
          <MessageSquareText className="w-4" />
          <p className="muted">{post.comments ? post.comments.length : 0}</p>
        </div>
      </div>
    </div>
  )
}
