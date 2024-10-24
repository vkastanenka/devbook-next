// components
import { UserCard } from '@/components/cards/user-card'
import { UserAboutCard } from '@/src/components/cards/user-about-card'
import { UserGithubRepositoriesCard } from '@/src/components/cards/user-github-repositories-card'

// utils
import { getCurrentUser, getUsername } from '@/src/lib/actions/auth'

// types
import { User } from '@/lib/types'
import { GetUsernameResponseData } from '@/lib/types'

interface UserProfilePage {
  params: {
    username: string
  }
}

const UserProfilePage: React.FC<UserProfilePage> = async ({ params }) => {
  if (!params?.username) return null

  // TODO: Update functionality if current user
  const currentUser = await getCurrentUser()
  if (!currentUser) return null // TODO: Proper error handling

  const user = await getUsername(params.username, {
    include: { addresses: true, userEducations: true, userExperiences: true },
  })
  if (!user) return null // TODO: Proper error handling

  const userData: User = (user as GetUsernameResponseData).data

  return (
    <div className="flex flex-col gap-4">
      <UserCard user={userData} />
      <UserAboutCard userAbout={userData.bio} />
      <UserGithubRepositoriesCard
        githubRepositories={userData.githubRepositories}
      />
    </div>
  )
}

export default UserProfilePage
