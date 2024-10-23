// components
import { NoUserPostsCard } from '@/src/components/cards/no-user-posts-card'
// import { Separator } from '@/src/components/ui/separator'
import { UserCard } from '@/components/cards/user-card'
import { UserAboutCard } from '@/src/components/cards/user-about-card'
// import { CreatePostCard } from '@/components/cards/create-post-card'
// import { UserFeed } from '@/src/components/modules/user-feed'
// import { ContactsCard } from '@/components/cards/contacts-card'

// utils
import { getUser } from '@/src/lib/actions/auth'

// types
import { User } from '@/lib/types'
import { GetUserResponseData } from '@/lib/types'

interface UserPage {
  params: {
    username: string
  }
}

const UserPage: React.FC<UserPage> = async ({ params }) => {
  // Check if current user page and adjust settings accordingly

  const user = await getUser(params?.username)
  if (!user) return null

  const userData: User = (user as GetUserResponseData).data

  // Query user feed
  // const feed = []

  return (
    <div className="flex gap-8">
      {/* user info */}
      <div className="basis-1/2 flex flex-col gap-4">
        <UserCard user={userData} />
        {userData.bio && <UserAboutCard userAbout={userData.bio} />}
      </div>
      {/* user feed */}
      <div className="basis-1/2">
        <NoUserPostsCard />
      </div>
    </div>
  )
}

export default UserPage
