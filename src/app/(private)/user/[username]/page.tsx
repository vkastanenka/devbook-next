// components
import { NoUserPostsCard } from '@/src/components/cards/no-user-posts-card'
// import { Separator } from '@/src/components/ui/separator'
// import { UserCard } from '@/components/cards/user-card'
// import { CreatePostCard } from '@/components/cards/create-post-card'
// import { UserFeed } from '@/src/components/modules/user-feed'
// import { ContactsCard } from '@/components/cards/contacts-card'

// utils
import { getUser } from '@/src/lib/actions/auth'

interface UserPage {
  params: {
    username: string
  }
}

const UserPage: React.FC<UserPage> = async ({ params }) => {
  const user = await getUser(params?.username)
  if (!user) return null

  // Query user feed
  // const feed = []

  return (
    <div className="flex gap-8">
      {/* user info */}
      <div className="basis-1/2">
        User info{/* <UserCard user={currentUser} /> */}
      </div>
      {/* user feed */}
      <div className="basis-1/2">
        <NoUserPostsCard />
      </div>
    </div>
  )
}

export default UserPage
