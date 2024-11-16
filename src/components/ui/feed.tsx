'use client'

// actions
import {
  userReadCurrentUserFeed,
  userReadUsername,
} from '@/src/actions/user-actions'

// components
import { NoContentCard } from '@/src/components/cards/no-content/no-content-card'
import { PostCard } from '@/src/components/cards/post/post-card'

// svg
import { LoaderCircle } from 'lucide-react'

// utils
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

// types
import { Post } from '@/src/types/post-types'
import { User } from '@/src/types/user-types'

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
  const [posts, setPosts] = useState(initialPosts || [])
  const [skip, setSkip] = useState(0)
  const [ref, inView] = useInView()
  const [allPostsLoaded, setAllPostsLoaded] = useState(false)

  useEffect(() => {
    if (
      initialPosts &&
      initialPosts.length > 0 &&
      posts &&
      posts.length > 0 &&
      initialPosts[0].createdAt > posts[0].createdAt
    ) {
      setPosts((prevState) => [
        initialPosts[0],
        ...(prevState ? prevState : []),
      ])
    }
  }, [initialPosts, posts])

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

      setPosts((prevState) => [...(prevState ? prevState : []), ...resData])

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

      setPosts((prevState) => [
        ...(prevState ? prevState : []),
        ...(resData?.posts ? resData.posts : []),
      ])

      if (resData && resData.posts.length < 5) {
        setAllPostsLoaded(true)
      } else if (resData && resData.posts.length > 0) {
        setSkip((prevState) => prevState + 5)
      }

      return
    }

    if (inView && user) userAction()
    else if (inView) currentUserAction()
  }, [inView, user])

  if (posts.length < 1) {
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
      {posts.map((post) => (
        <PostCard key={post.id} post={post} currentUser={currentUser} />
      ))}
      {!allPostsLoaded && (
        <LoaderCircle ref={ref} className="animate-spin self-center" />
      )}
    </div>
  )
}
