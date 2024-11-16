'use client'

// actions
import { userReadCurrentUserFeed } from '@/src/actions/user-actions'

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
}

export const Feed: React.FC<Feed> = ({
  isCurrentUser,
  currentUser,
  initialPosts,
}) => {
  const [posts, setPosts] = useState(initialPosts)
  const [skip, setSkip] = useState(0)
  const [ref, inView] = useInView()
  const [allPostsLoaded, setAllPostsLoaded] = useState(false)

  useEffect(() => {
    const action = async () => {
      const nextSkip = skip + 5
      const { data: resData } = await userReadCurrentUserFeed(
        `?skip=${nextSkip}&take=5`
      )

      if (resData) {
        setPosts((prevState) => [...(prevState ? prevState : []), ...resData])

        if (resData.length < 5) {
          setAllPostsLoaded(true)
        }

        if (resData.length > 0) {
          setSkip((prevState) => prevState + 5)
        }
      }
    }

    if (inView) action()
  }, [inView])

  if (!posts || posts.length === 0) {
    setAllPostsLoaded(true)
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
