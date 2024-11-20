'use client'

// actions
import {
  userReadCurrentUserFeed,
  userReadUsername,
} from '@/src/actions/user-actions'

// components
import { NoContentCard } from '@/src/components/cards/no-content/no-content-card'
import { NoContentPostCard } from '@/src/components/cards/no-content/no-content-post-card'
import { PostCard } from '@/src/components/cards/post/post-card'

// svg
import { LoaderCircle } from 'lucide-react'

// utils
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useFeedStore } from '@/src/hooks/use-feed-store'

// types
import { Post } from '@vkastanenka/devbook-types/dist/post'
import { User } from '@vkastanenka/devbook-types/dist/user'

interface Feed {
  isCurrentUser?: boolean
  initialPosts?: Post[]
  currentUser: User
  user?: User
}

export const Feed: React.FC<Feed> = ({
  isCurrentUser,
  currentUser,
  initialPosts,
  user,
}) => {
  const { feedPosts, setFeedPosts } = useFeedStore()

  const [skip, setSkip] = useState(0)
  const [ref, inView] = useInView()
  const [isLoading, setIsLoading] = useState(true)
  const [allPostsLoaded, setAllPostsLoaded] = useState(false)

  useEffect(() => {
    setFeedPosts(initialPosts || [])
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const currentUserAction = async () => {
      const nextSkip = skip + 5

      const { data: resData } = await userReadCurrentUserFeed(
        `?skip=${nextSkip}&take=5`
      )

      if (!resData) return

      if (resData.length < 5) {
        setAllPostsLoaded(true)
      } else if (resData.length > 0) {
        setSkip((prevState) => prevState + 5)
      }

      setFeedPosts([...feedPosts, ...resData])

      return
    }

    const userAction = async () => {
      const nextSkip = skip + 5

      const { data: resData } = await userReadUsername(user?.username || '', {
        include: {
          posts: {
            include: {
              postLikes: true,
              user: true,
              _count: { select: { comments: true, postLikes: true } },
            },
            orderBy: { createdAt: 'desc' },
            skip: nextSkip,
            take: 5,
          },
        },
      })

      if (!resData?.posts) return

      if (resData && resData.posts.length < 5) {
        setAllPostsLoaded(true)
      } else if (resData && resData.posts.length > 0) {
        setSkip((prevState) => prevState + 5)
      }

      setFeedPosts([...feedPosts, ...(resData?.posts ? resData.posts : [])])

      return
    }

    if (inView && user) userAction()
    else if (inView) currentUserAction()
  }, [inView])

  if (isLoading && !initialPosts) {
    return <LoaderCircle ref={ref} className="animate-spin self-center" />
  }

  if (isLoading && initialPosts) {
    return (
      <div className="flex flex-col gap-4">
        {initialPosts.map((post) => (
          <NoContentPostCard key={post.id} />
        ))}
      </div>
    )
  }

  if (feedPosts.length < 1) {
    if (isCurrentUser) {
      return (
        <NoContentCard
          heading="Welcome to Devbook!"
          subheading="Create a post above to get started."
        />
      )
    } else {
      return (
        <NoContentCard
          heading="Looks a little empty!"
          subheading="This user hasn't posted anything yet."
        />
      )
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {feedPosts.map((post) => (
        <PostCard key={post.id} post={post} currentUser={currentUser} />
      ))}
      {!allPostsLoaded && (
        <LoaderCircle ref={ref} className="animate-spin self-center" />
      )}
    </div>
  )
}
