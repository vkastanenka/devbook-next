// components
import { Separator } from '@/src/components/ui/separator'
import { UserCard } from '@/components/cards/user-card'
import { CreatePostCard } from '@/components/cards/create-post-card'
import { PostCard } from '@/components/cards/post-card'
import { ContactsCard } from '@/components/cards/contacts-card'

// utils
import { getSessionById } from '@/src/lib/actions/session'

const sessionId = 'd35623ee-bef6-42b2-8776-2f99f8bb4782'

const FeedPage: React.FC = async () => {
  const session = await getSessionById({ id: sessionId })

  console.log(session)

  return (
    <div className="flex gap-8">
      {/* user card */}
      <div className="basis-1/4">
        <UserCard />
      </div>
      {/* timeline */}
      <div className="basis-1/2 flex flex-col gap-4">
        <CreatePostCard />
        <Separator />
        <PostCard />
      </div>
      {/* contacts */}
      <div className="basis-1/4">
        <ContactsCard />
      </div>
    </div>
  )
}

export default FeedPage
