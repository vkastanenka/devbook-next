// components
import Link from 'next/link'
import { CommentActionButtons } from '@/src/components/buttons/post/post-comment-action-buttons'
import { NoContentCard } from '@/src/components/cards/no-content/no-content-card'
import { PostCurrentUserCommentOptionButtons } from '@/src/components/buttons/post/post-current-user-comment-options-buttons'
import { UserAvatar } from '@/src/components/ui/avatar'

// svg
import { MessageSquareText, ThumbsUp } from 'lucide-react'

// utils
import { cn, formatText } from '@/src/lib/utils'

// types
import { Comment, Post } from '@/src/types/post-types'
import { User } from '@/src/types/user-types'

interface CommentUi {
  className?: string
  comment: Comment
  currentUser?: User
}

interface PostUi {
  className?: string
  post: Post
  currentUser?: User
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

export const PostComment: React.FC<CommentUi> = ({
  className,
  comment,
  currentUser,
}) => {
  console.log(comment)
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {comment.user ? (
        <div className="inline-block">
          <Link
            href={`/user/${comment.user.username}`}
            className="inline-flex items-center gap-2"
          >
            <UserAvatar className="avatar-xs" user={comment.user} />
            <p className="p">{comment.user.name}</p>
          </Link>
        </div>
      ) : (
        <p className="h4">No user on this comment</p>
      )}
      <div className="flex gap-2">
        <div className="w-[36px]" />
        <div className="flex flex-col gap-1">
          <div className="bg-muted rounded-md p-2 relative">
            {formatText(comment.body)}
          </div>
          <div className="flex items-center gap-2 px-2">
            <CommentActionButtons comment={comment} />
            <PostCurrentUserCommentOptionButtons
              comment={comment}
              currentUser={currentUser}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export const PostComments: React.FC<PostUi> = ({
  className,
  post,
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
          key={post.id}
          comment={comment}
          currentUser={currentUser}
        />
      ))}
    </div>
  )
}
