'use client'

// actions
import { postReadComment, postReadPost } from '@/src/actions/post-actions'
import { userReadCurrentUser } from '@/src/actions/user-actions'

// components
import Link from 'next/link'
import { PostComments } from '@/src/components/ui/post-comments'
import { PostCard } from '@/src/components/cards/post/post-card'
import { CurrentUserContactsCard } from '@/src/components/cards/user/current-user-contacts-card'
import { NoContentCard } from '@/src/components/cards/no-content/no-content-card'

// svg
import { CircleArrowLeft, LoaderCircle } from 'lucide-react'

// utils
import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { cn } from '@/src/lib/utils'
import { useFeedStore } from '@/src/hooks/use-feed-store'

// types
import { Comment, Post } from '@/src/types/post-types'
import { User } from '@/src/types/user-types'
import { NoContentPostCard } from '../cards/no-content/no-content-post-card'

interface FeedCurrentPost {
  className?: string
  post: Post
  currentUser: User
  parentComment?: Comment
  subCommentLayerLimit: number
}

export const FeedCurrentPost: React.FC<FeedCurrentPost> = ({
  className,
  post,
  currentUser,
  parentComment,
  subCommentLayerLimit,
}) => {
  const { feedCurrentPost, setFeedCurrentPost } = useFeedStore()

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setFeedCurrentPost(post)
    setIsLoading(false)
  }, [])

  return (
    <div className={cn('flex flex-col gap-8', className)}>
      {isLoading && <NoContentPostCard />}
      {!isLoading && feedCurrentPost && (
        <PostCard
          post={feedCurrentPost}
          currentUser={currentUser}
          onDeleteRedirectPath="/feed"
        />
      )}
      {isLoading && (
        <div className="flex justify-center">
          <LoaderCircle />
        </div>
      )}
      {!isLoading && feedCurrentPost && (
        <PostComments
          parentComment={parentComment}
          post={feedCurrentPost}
          currentUser={currentUser}
          subCommentLayerLimit={subCommentLayerLimit}
        />
      )}
    </div>
  )
}
