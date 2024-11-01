// components
import { Separator } from '@/src/components/ui/separator'
import { CurrentUserCard } from '@/components/cards/user/current-user-card'
import { CurrentUserCreatePostCard } from '@/components/cards/user/current-user-create-post-card'
import { UserFeed } from '@/src/components/modules/user-feed'
import { CurrentUserContactsCard } from '@/components/cards/user/current-user-contacts-card'

// utils
import { getCurrentUser, getUsername } from '@/actions/user-actions'

// types
import { User } from '@/types/user-types'
import { GetUsernameResData } from '@/types/server-types'

const FeedPage: React.FC = async () => {
  const currentUser = await getCurrentUser()
  if (!currentUser) return null

  const currentUserUsernameResponse = await getUsername(currentUser.username, {
    include: {
      contacts: true,
      posts: true,
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
        <UserFeed posts={currentUserWithRelations.posts} />
      </div>

      {/* contacts */}
      <div className="hidden lg:block lg:basis-1/3 xl:basis-1/4">
        <CurrentUserContactsCard currentUser={currentUserWithRelations} />
      </div>
    </div>
  )
}

export default FeedPage
