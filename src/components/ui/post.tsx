// components
import Link from 'next/link'
import { CommentActionButtons } from '@/src/components/buttons/post/post-comment-action-buttons'
import { NoContentCard } from '@/src/components/cards/no-content/no-content-card'
import { CommentCurrentUserOptionsButtons } from '@/src/components/buttons/post/post-current-user-comment-options-buttons'
import { UserAvatar } from '@/src/components/ui/avatar'
import { Comment as PostComment } from '@/src/components/ui/comment'

// svg
import { MessageSquareText, ThumbsUp } from 'lucide-react'

// utils
import { cn, formatText } from '@/src/lib/utils'

// types
import { Comment, Post } from '@/src/types/post-types'
import { User } from '@/src/types/user-types'

interface PostUi {
  className?: string
  post: Post
  currentUser: User
}

export const PostUser: React.FC<PostUi> = ({ className, post }) => {
  return (
    <div className={className}>
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

export const PostBody: React.FC<PostUi> = ({ className, post }) => {
  return <div className={className}>{formatText(post.body)}</div>
}

export const PostActivity: React.FC<PostUi> = ({ className, post }) => {
  return (
    <div className={className}>
      <div className="flex justify-between text-accent">
        <div className="flex justify-center gap-1">
          <ThumbsUp className="w-4" />
          <p className="muted">
            {post._count?.postLikes ? post._count?.postLikes : 0}
          </p>
        </div>
        <div className="flex justify-center gap-1">
          <MessageSquareText className="w-4" />
          <p className="muted">
            {post._count?.comments ? post._count?.comments : 0}
          </p>
        </div>
      </div>
    </div>
  )
}

export const PostComments: React.FC<PostUi> = ({
  post,
  className,
  currentUser,
}) => {
  if (!post || !post.comments || post.comments?.length === 0) {
    return (
      <NoContentCard
        heading="Looks a little empty!"
        subheading="Be the first to comment and show a little love."
      />
    )
  }

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {post.comments.map((comment) => (
        <PostComment
          key={comment.id}
          post={post}
          comment={comment}
          currentUser={currentUser}
        />
      ))}
    </div>
  )
}
