// components
import { Separator } from '@/src/components/ui/separator'
import { CurrentUserCard } from '@/components/cards/user/current-user-card'
import { CurrentUserCreatePostCard } from '@/components/cards/user/current-user-create-post-card'
import { UserFeed } from '@/src/components/modules/user-feed'
import { CurrentUserContactsCard } from '@/components/cards/user/current-user-contacts-card'

const FeedPage: React.FC = () => {
  return (
    <div className="flex gap-8">
      {/* user card */}
      <div className="basis-1/4 hidden xl:block">
        <CurrentUserCard />
      </div>

      {/* timeline */}
      <div className="basis-full lg:basis-2/3 xl:basis-1/2 flex flex-col gap-4">
        <CurrentUserCreatePostCard />
        <Separator />
        <UserFeed />
      </div>

      {/* contacts */}
      <div className="hidden lg:block lg:basis-1/3 xl:basis-1/4">
        <CurrentUserContactsCard />
      </div>
    </div>
  )
}

export default FeedPage
