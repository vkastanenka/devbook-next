// components
import { CurrentUserCard } from '@/components/cards/user/current-user-card'
import { CurrentUserContactsCard } from '@/components/cards/user/current-user-contacts-card'
import { CurrentUserCreatePostCard } from '@/components/cards/user/current-user-create-post-card'
// import { Feed } from '@/components/ui/feed'
import { NoContentCard } from '@/src/components/cards/no-content/no-content-card'
import { Separator } from '@/components/ui/separator'

// utils
import { readCurrentUser } from '@/actions/user-actions'

const FeedPage: React.FC = async () => {
  const { data: currentUser, message } = await readCurrentUser({
    include: { contacts: true },
  })

  if (!currentUser) {
    return <NoContentCard heading="Error!" subheading={message} />
  }

  // Read feed

  return (
    <div className="flex gap-8">
      <div className="basis-1/4 hidden xl:block">
        <CurrentUserCard currentUser={currentUser} />
      </div>

      <div className="basis-full lg:basis-2/3 xl:basis-1/2 flex flex-col gap-4">
        <CurrentUserCreatePostCard currentUser={currentUser} />
        <Separator />
        {/* <Feed
          currentUser={currentUserWithRelations}
          // TODO: Update to be current user feed (combination of all posts)
          posts={currentUserWithRelations.posts}
        /> */}
      </div>

      <div className="hidden lg:block lg:basis-1/3 xl:basis-1/4">
        <CurrentUserContactsCard currentUser={currentUser} />
      </div>
    </div>
  )
}

export default FeedPage
