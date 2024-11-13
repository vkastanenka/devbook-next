// components
import Link from 'next/link'
import { UserAvatar } from '@/src/components/ui/avatar'

// svg
import { MessageSquareText, ThumbsUp } from 'lucide-react'

// utils
import { format as formatDate, parseISO } from 'date-fns'
import { cn, formatText } from '@/src/lib/utils'

// types
import { Post } from '@/src/types/post-types'
import { User } from '@/src/types/user-types'

interface PostUi {
  className?: string
  currentUser?: User
  post: Post
}

export const PostUser: React.FC<PostUi> = ({ className, post }) => {
  return (
    <div className={className}>
      {post.user ? (
        <div className="inline-block">
          <Link
            href={`/user/${post.user.username}`}
            className="button-text inline-flex items-center gap-2"
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
  return (
    <div className={cn('flex', 'flex-col', 'gap-2', className)}>
      {formatText(post.body)}
      <p className="muted text-accent">
        {formatDate(parseISO(post.createdAt), 'MMM dd yyyy h:mmaaa')}
      </p>
    </div>
  )
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
