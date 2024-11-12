'use client'

// components
import Link from 'next/link'
import { CommentActionButtons } from '@/src/components/buttons/post/post-comment-action-buttons'
import { CommentCurrentUserOptionsButtons } from '@/src/components/buttons/post/post-current-user-comment-options-buttons'
import { UserAvatar } from '@/src/components/ui/avatar'

// svg
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react'

// utils
import { useState } from 'react'
import { cn, formatText } from '@/src/lib/utils'

// types
import { Comment as CommentType, Post } from '@/src/types/post-types'
import { User } from '@/src/types/user-types'

interface PostComment {
  className?: string
  comment: CommentType
  currentUser: User
  post: Post
  subCommentLvl?: number
}

export const Comment: React.FC<PostComment> = ({
  post,
  className,
  comment,
  currentUser,
  subCommentLvl = 1,
}) => {
  const [commentLimit, setCommentLimit] = useState(1)

  return (
    <div className={cn('flex flex-col gap-6 relative', className)}>
      {comment.subComments && comment.subComments.length > 0 && (
        <div
          className={cn(
            'border w-[1px] absolute left-[16px] top-0',
            comment.subComments.length > 1 ? 'h-[calc(100%-46px)]' : 'h-full'
          )}
        />
      )}

      <div className={'flex flex-col gap-2'}>
        {comment.user && (
          <div className="inline-block">
            <Link
              href={`/user/${comment.user.username}`}
              className="inline-flex items-center gap-2"
            >
              <UserAvatar className="avatar-xs" user={comment.user} />
              <p className="p">{comment.user.name}</p>
            </Link>
          </div>
        )}
        <div className="flex">
          <div className="pl-9 flex flex-col gap-2">
            <div className="flex gap-2">
              <div className="bg-card border shadow-sm rounded-lg p-2 relative">
                {formatText(comment.body)}
              </div>
              <CommentCurrentUserOptionsButtons
                comment={comment}
                currentUser={currentUser}
                className="mt-2"
              />
            </div>
            <CommentActionButtons
              comment={comment}
              currentUser={currentUser}
              post={post}
            />
          </div>
        </div>
      </div>

      {comment.subComments && comment.subComments.length > 0 && (
        <div className="flex items-start flex-col gap-6 pl-[44px]">
          {comment.subComments.slice(0, commentLimit).map((subComment) => (
            <div className="relative">
              <div className="border w-7 h-[1px] absolute -left-7 top-4" />
              <Comment
                key={subComment.id}
                comment={subComment}
                post={post}
                currentUser={currentUser}
                subCommentLvl={subCommentLvl + 1}
              />
            </div>
          ))}
        </div>
      )}

      {comment.subComments && comment.subComments.length > commentLimit && (
        <button
          className="muted flex items-center gap-2"
          onClick={() => setCommentLimit((prevState) => prevState + 100)}
        >
          View more replies
          <CircleArrowRight className="w-4 pt-1" />
        </button>
      )}

      {comment.subComments &&
        comment.subComments.length > 0 &&
        comment.subComments.length < commentLimit && (
          <button
            className="muted flex items-center gap-2"
            onClick={() => setCommentLimit(1)}
          >
            <CircleArrowLeft className="w-4 pt-1" />
            Hide replies
          </button>
        )}
    </div>
  )
}
