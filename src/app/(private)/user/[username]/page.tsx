// actions
import { userReadCurrentUser } from '@/src/actions/user-actions'
import { userReadUsername } from '@/src/actions/user-actions'

// components
import { Feed } from '@/src/components/ui/feed'
import { Separator } from '@/src/components/ui/separator'
import { NoContentCard } from '@/src/components/cards/no-content/no-content-card'
import { UserDetailsCard } from '@/src/components/cards/user/user-details-card'
import { UserBioCard } from '@/src/components/cards/user/user-bio-card'
import { UserContactsCard } from '@/src/components/cards/user/user-contacts-card'
import { CurrentUserCreatePostCard } from '@/src/components/cards/user/current-user-create-post-card'

// utils
import { cn } from '@/src/lib/utils'
import { redirect } from 'next/navigation'

// types
import { Post } from '@/src/types/post-types'

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
              comments: {
                include: { commentLikes: true, subComments: true },
                orderBy: { createdAt: 'desc' },
              },
              postLikes: true,
            },
            orderBy: { createdAt: 'desc' },
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
    // Get feed and set posts
  }

  return (
    <div className="flex gap-8">
      <div className="basis-1/2 flex flex-col gap-4">
        <UserDetailsCard currentUser={currentUser} user={user} />
        <UserBioCard user={user} />
        <UserContactsCard user={user} />
      </div>
      <div
        className={cn('basis-1/2', isCurrentUser ? 'flex flex-col gap-4' : '')}
      >
        {isCurrentUser && (
          <CurrentUserCreatePostCard currentUser={currentUser} />
        )}
        {isCurrentUser && <Separator />}
        <Feed isCurrentUser={isCurrentUser} posts={posts} user={user} />
      </div>
    </div>
  )
}

export default UserPage
