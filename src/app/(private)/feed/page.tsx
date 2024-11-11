// actions
import { userReadCurrentUser } from '@/src/actions/user-actions'
import { userReadCurrentUserFeed } from '@/src/actions/user-actions'

// components
import { CurrentUserCard } from '@/src/components/cards/user/current-user-card'
import { CurrentUserContactsCard } from '@/src/components/cards/user/current-user-contacts-card'
import { CurrentUserCreatePostCard } from '@/src/components/cards/user/current-user-create-post-card'
import { Feed } from '@/src/components/ui/feed'
import { NoContentCard } from '@/src/components/cards/no-content/no-content-card'
import { Separator } from '@/src/components/ui/separator'

const FeedPage: React.FC = async () => {
  const { data: currentUser, message } = await userReadCurrentUser({
    include: { contacts: { orderBy: { createdAt: 'desc' } } },
  })

  if (!currentUser) {
    return <NoContentCard heading="Error!" subheading={message} />
  }

  const posts = await userReadCurrentUserFeed()

  return (
    <div className="flex gap-8">
      <div className="basis-1/4 hidden xl:block">
        <CurrentUserCard currentUser={currentUser} />
      </div>

      <div className="basis-full lg:basis-2/3 xl:basis-1/2 flex flex-col gap-4">
        <CurrentUserCreatePostCard currentUser={currentUser} />
        <Separator />
        {posts && posts.data ? (
          <Feed
            isCurrentUser={true}
            posts={posts.data}
            currentUser={currentUser}
          />
        ) : (
          <NoContentCard heading="Error!" subheading="Error fetching feed" />
        )}
      </div>

      <div className="hidden lg:block lg:basis-1/3 xl:basis-1/4">
        <CurrentUserContactsCard currentUser={currentUser} />
      </div>
    </div>
  )
}

export default FeedPage
