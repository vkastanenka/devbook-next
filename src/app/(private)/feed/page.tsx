// components
import { Separator } from '@/src/components/ui/separator'
import { UserCard } from '@/components/cards/user-card'
import { CreatePostCard } from '@/components/cards/create-post-card'
import { PostCard } from '@/components/cards/post-card'
import { ContactsCard } from '@/components/cards/contacts-card'

// utils
import { getCurrentUser } from '@/src/lib/actions/auth'

const FeedPage: React.FC = async () => {
  const currentUser = await getCurrentUser()
  if (!currentUser) return null

  return (
    <div className="flex gap-8">
      {/* user card */}
      <div className="basis-1/4">
        <UserCard user={currentUser} />
      </div>
      {/* timeline */}
      <div className="basis-1/2 flex flex-col gap-4">
        <CreatePostCard user={currentUser} />
        <Separator />
        <PostCard user={currentUser} />
      </div>
      {/* contacts */}
      <div className="basis-1/4">
        <ContactsCard />
      </div>
    </div>
  )
}

export default FeedPage
