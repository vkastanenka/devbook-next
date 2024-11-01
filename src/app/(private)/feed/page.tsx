// components
import { CurrentUserCard } from '@/components/cards/user/current-user-card'
import { CurrentUserContactsCard } from '@/components/cards/user/current-user-contacts-card'
import { CurrentUserCreatePostCard } from '@/components/cards/user/current-user-create-post-card'
import { Feed } from '@/components/ui/feed'
import { Separator } from '@/components/ui/separator'

// utils
import { getCurrentUser, getUsername } from '@/actions/user-actions'

// types
import { GetUsernameResData } from '@/types/server-types'
import { User } from '@/types/user-types'

const FeedPage: React.FC = async () => {
  const currentUser = await getCurrentUser()
  if (!currentUser) return null

  const currentUserUsernameResponse = await getUsername(currentUser.username, {
    include: {
      contacts: true,
      posts: {
        include: {
          user: true,
          comments: true,
          postLikes: true,
        },
      },
    },
  })
  if (!currentUserUsernameResponse.status) return null

  const currentUserWithRelations: User = (
    currentUserUsernameResponse as GetUsernameResData
  ).data

  return (
    <div className="flex gap-8">
      {/* user card */}
      <div className="basis-1/4 hidden xl:block">
        <CurrentUserCard currentUser={currentUserWithRelations} />
      </div>

      {/* timeline */}
      <div className="basis-full lg:basis-2/3 xl:basis-1/2 flex flex-col gap-4">
        <CurrentUserCreatePostCard currentUser={currentUserWithRelations} />
        <Separator />
        <Feed
          currentUser={currentUserWithRelations}
          // TODO: Update to be current user feed (combination of all posts)
          posts={currentUserWithRelations.posts}
        />
      </div>

      {/* contacts */}
      <div className="hidden lg:block lg:basis-1/3 xl:basis-1/4">
        <CurrentUserContactsCard currentUser={currentUserWithRelations} />
      </div>
    </div>
  )
}

export default FeedPage
