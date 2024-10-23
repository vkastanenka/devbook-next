// components
import { Separator } from '@/src/components/ui/separator'
import { UserCard } from '@/components/cards/user-card'
import { CreatePostCard } from '@/components/cards/create-post-card'
import { UserFeed } from '@/src/components/modules/user-feed'
import { ContactsCard } from '@/components/cards/contacts-card'

// utils
import { getCurrentUser } from '@/src/lib/actions/auth'

const FeedPage: React.FC = async () => {
  const currentUser = await getCurrentUser()
  if (!currentUser) return null

  // Query for current user feed
  // const feed = []

  // Query for current user contacts
  // const contacts = []

  return (
    <div className="flex gap-8">
      {/* user card */}
      <div className="basis-1/4 hidden xl:block">
        <UserCard user={currentUser} />
      </div>
      {/* timeline */}
      <div className="basis-full lg:basis-2/3 xl:basis-1/2 flex flex-col gap-4">
        <CreatePostCard user={currentUser} />
        <Separator />
        <UserFeed />
      </div>
      {/* contacts */}
      <div className="hidden lg:block lg:basis-1/3 xl:basis-1/4">
        <ContactsCard />
      </div>
    </div>
  )
}

export default FeedPage
