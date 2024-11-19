'use client'

// components
import Link from 'next/link'
import { CommentActionButtons } from '@/src/components/buttons/post/post-comment-action-buttons'
import { CommentCurrentUserOptionsButtons } from '@/src/components/buttons/post/post-current-user-comment-options-buttons'
import { NoContentCard } from '@/src/components/cards/no-content/no-content-card'
import { UserAvatar } from '@/src/components/ui/avatar'

// svg
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react'

// utils
import { useState } from 'react'
import { format as formatDate, parseISO } from 'date-fns'
import { cn, formatText } from '@/src/lib/utils'

// types
import { Comment, Post } from '@/src/types/post-types'
import { User } from '@/src/types/user-types'
import { Card } from './card'

interface PostComments {
  className?: string
  currentUser: User
  parentComment?: Comment
  post: Post
  subCommentLayerLimit: number
}

export const PostComments: React.FC<PostComments> = ({
  className,
  currentUser,
  parentComment,
  post,
  subCommentLayerLimit,
}) => {
  if (!post.comments || post.comments.length === 0) {
    return (
      <NoContentCard
        heading="Looks a little empty!"
        subheading="Be the first to comment and show a little love."
      />
    )
  }

  return (
    <div className={cn('flex flex-col gap-8', className)}>
      {parentComment && parentComment.parentCommentId && (
        <div className={cn('flex gap-2', className)}>
          <div className="inline-block">
            <Link
              className="inline-flex items-center gap-2 button-text"
              href={`/comments/${post.id}`}
            >
              <CircleArrowLeft /> View all comments
            </Link>
          </div>
          <div className="inline-block">
            <Link
              className="inline-flex items-center gap-2 button-text"
              href={`/comments/${post.id}?parentCommentId=${parentComment.parentCommentId}`}
            >
              <CircleArrowLeft /> View previous comments
            </Link>
          </div>
        </div>
      )}
      {parentComment && (
        <PostComment
          post={post}
          isParentComment
          comment={parentComment}
          currentUser={currentUser}
          subCommentLayerLimit={subCommentLayerLimit}
        />
      )}
      {!parentComment &&
        post.comments.map((comment) => (
          <PostComment
            key={comment.id}
            post={post}
            comment={comment}
            currentUser={currentUser}
            subCommentLayerLimit={subCommentLayerLimit}
          />
        ))}
    </div>
  )
}

interface PostComment {
  className?: string
  comment: Comment
  isParentComment?: boolean
  currentUser: User
  post: Post
  subCommentLayer?: number
  subCommentLayerLimit: number
  subCommentLimitProp?: number
}

export const PostComment: React.FC<PostComment> = ({
  post,
  className,
  comment,
  isParentComment,
  currentUser,
  subCommentLayer = 0,
  subCommentLayerLimit,
  subCommentLimitProp = 0,
}) => {
  const [subCommentLimit, setSubCommentLimit] = useState(subCommentLimitProp)

  const hasSubComments = comment.subComments && comment.subComments.length > 0
  const hasSubCommentCount =
    comment._count?.subComments && comment._count.subComments > 0

  return (
    <div className={cn('flex flex-col gap-4 relative', className)}>
      {hasSubCommentCount ? (
        <div
          className={cn(
            'border w-[1px] absolute left-[calc(4px+24px)] top-[4px]',
            hasSubCommentCount ? 'h-[calc(100%-48px)]' : 'h-full'
          )}
        />
      ) : null}

      <div className={'flex flex-col gap-2'}>
        {comment.user && (
          <div className="inline-block">
            <Link
              href={`/user/${comment.user.username}`}
              className="button-text inline-flex items-center gap-2"
            >
              <UserAvatar className="w-9 h-9 text-sm" user={comment.user} />
              <p className="p">{comment.user.name}</p>
            </Link>
          </div>
        )}

        <div>
          <div className="pl-12 flex flex-col gap-2">
            <div className="flex gap-2">
              <Card className="p-4 flex flex-col gap-2">
                {formatText(comment.body)}
                <p className="muted text-accent">
                  {formatDate(
                    parseISO(comment.createdAt),
                    'MMM dd yyyy h:mmaaa'
                  )}
                </p>
              </Card>
              <CommentCurrentUserOptionsButtons
                comment={comment}
                onDeleteRedirectPath={
                  isParentComment ? `/comments/${post.id}` : undefined
                }
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

      {hasSubComments && subCommentLimit > subCommentLimitProp ? (
        <div className="flex items-start flex-col gap-4 pl-[44px]">
          {comment.subComments?.slice(0, subCommentLimit).map((subComment) => (
            <div key={subComment.id} className="relative">
              <div className="border w-7 h-[1px] absolute -left-4 top-[26px]" />
              <PostComment
                comment={subComment}
                post={post}
                currentUser={currentUser}
                subCommentLayer={subCommentLayer + 1}
                subCommentLayerLimit={subCommentLayerLimit}
                subCommentLimitProp={subCommentLimitProp}
              />
            </div>
          ))}
        </div>
      ) : null}

      {/* Show subcomments */}
      {comment.subComments &&
      comment.subComments.length > 0 &&
      comment.subComments.length > subCommentLimit ? (
        <div>
          <button
            className="muted flex items-center gap-2 button-text"
            onClick={() => setSubCommentLimit((prevState) => prevState + 100)}
          >
            View more replies
            <CircleArrowRight className="w-4 pt-1" />
          </button>
        </div>
      ) : null}

      {/* Hide subcomments */}
      {comment.subComments &&
      comment.subComments.length > 0 &&
      comment.subComments.length < subCommentLimit ? (
        <div>
          <button
            className="muted flex items-center gap-2 button-text"
            onClick={() => setSubCommentLimit(0)}
          >
            <CircleArrowLeft className="w-4 pt-1" />
            Hide replies
          </button>
        </div>
      ) : null}

      {/* Subcomment layer exceed layer limit, set parent comment to see thread */}
      {hasSubCommentCount && subCommentLayer === subCommentLayerLimit ? (
        <div className="inline-block">
          <Link
            href={`/comments/${post.id}?parentCommentId=${comment.id}`}
            className="button-text muted inline-flex items-center gap-2"
          >
            View all replies
            <CircleArrowRight className="w-4 pt-1" />
          </Link>
        </div>
      ) : null}
    </div>
  )
}
