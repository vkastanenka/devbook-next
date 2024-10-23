// components
import { UserCard } from '@/components/cards/user-card'
import { UserAboutCard } from '@/src/components/cards/user-about-card'

// utils
import { getUser } from '@/src/lib/actions/auth'

// types
import { User } from '@/lib/types'
import { GetUserResponseData } from '@/lib/types'

interface UserProfilePage {
  params: {
    username: string
  }
}

const UserProfilePage: React.FC<UserProfilePage> = async ({ params }) => {
  const user = await getUser(params?.username)
  if (!user) return null

  const userData: User = (user as GetUserResponseData).data

  return (
    <div className="flex flex-col gap-4">
      <UserCard user={userData} />
      <UserAboutCard userAbout={userData.bio} />
    </div>
  )
}

export default UserProfilePage
