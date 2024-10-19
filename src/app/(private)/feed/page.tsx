// components
import { Separator } from '@/src/components/ui/separator'
import { UserCard } from '@/components/cards/user-card'
import { CreatePostCard } from '@/components/cards/create-post-card'
import { PostCard } from '@/components/cards/post-card'
import { ContactsCard } from '@/components/cards/contacts-card'

// utils
import { getSessionById, getSessionCookie } from '@/src/lib/actions/auth'
import { getUserById } from '@/src/lib/actions/user'

const FeedPage: React.FC = async () => {
  const sessionCookie = await getSessionCookie()
  if (!sessionCookie) return null

  const session = await getSessionById({ id: sessionCookie.id })
  if (!session) return null

  const user = await getUserById({ id: session.userId })
  if (!user) return null

  console.log(user)

  return (
    <div className="flex gap-8">
      {/* user card */}
      <div className="basis-1/4">
        <UserCard user={user} />
      </div>
      {/* timeline */}
      <div className="basis-1/2 flex flex-col gap-4">
        <CreatePostCard user={user} />
        <Separator />
        {/* <PostCard /> */}
      </div>
      {/* contacts */}
      {/* <div className="basis-1/4">
        <ContactsCard />
      </div> */}
    </div>
  )
}

export default FeedPage
