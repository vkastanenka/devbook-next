'use client'

// components
import { PostComments } from '@/src/components/ui/post-comments'
import { PostCard } from '@/src/components/cards/post/post-card'

// svg
import { LoaderCircle } from 'lucide-react'

// utils
import { useEffect, useState } from 'react'
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
    return () => setFeedCurrentPost(undefined)
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
