// actions
import {
  userReadCurrentUser,
  userReadCurrentUserFeed,
  userReadUsername,
} from '@/src/actions/user-actions'

// components
import { Feed } from '@/src/components/ui/feed'
import { Separator } from '@/src/components/ui/separator'
import { NoContentCard } from '@/src/components/cards/no-content/no-content-card'
import { UserDetailsCard } from '@/src/components/cards/user/user-details-card'
import { UserContactsCard } from '@/src/components/cards/user/user-contacts-card'
import { CurrentUserCreatePostCard } from '@/src/components/cards/user/current-user-create-post-card'

// utils
import { cn } from '@/src/lib/utils'
import { redirect } from 'next/navigation'

// types
import { Post } from '@vkastanenka/devbook-types/dist/post'

interface UserPage {
  params: {
    username: string
  }
}

const UserPage: React.FC<UserPage> = async ({ params }) => {
  if (!params?.username) redirect('/feed')

  const { data: currentUser, message: currentUserResMessage } =
    await userReadCurrentUser({
      include: { contacts: { orderBy: { name: 'asc' } } },
    })

  if (!currentUser) {
    return <NoContentCard heading="Error!" subheading={currentUserResMessage} />
  }

  let isCurrentUser = true
  let posts: Post[] | undefined
  let user = currentUser

  if (currentUser.username !== params.username) {
    isCurrentUser = false

    const { data: userData, message: userMessage } = await userReadUsername(
      params.username,
      {
        include: {
          contacts: { orderBy: { name: 'asc' } },
          posts: {
            include: {
              postLikes: true,
              user: true,
              _count: { select: { comments: true, postLikes: true } },
            },
            orderBy: { createdAt: 'desc' },
            skip: 0,
            take: 5,
          },
        },
      }
    )

    if (!userData) {
      return <NoContentCard heading="Error!" subheading={userMessage} />
    }

    if (userData.posts) posts = userData.posts

    user = userData
  }

  if (isCurrentUser) {
    const postsResponse = await userReadCurrentUserFeed('?skip=0&take=5')
    posts = postsResponse.data
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
      <div className="basis-full lg:basis-1/2">
        <div className="flex flex-col gap-4 sticky top-[92px]">
          <UserDetailsCard currentUser={currentUser} user={user} />
          <UserContactsCard user={user} />
        </div>
      </div>
      <div
        className={cn(
          'basis-full lg:basis-1/2',
          isCurrentUser ? 'flex flex-col gap-4' : ''
        )}
      >
        {isCurrentUser && (
          <CurrentUserCreatePostCard currentUser={currentUser} />
        )}
        {isCurrentUser && <Separator />}
        <Feed
          isCurrentUser={isCurrentUser}
          initialPosts={posts}
          currentUser={currentUser}
          user={user}
        />
      </div>
    </div>
  )
}

export default UserPage
