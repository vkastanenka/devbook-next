// components
import { UserCard } from '@/components/cards/user/user-card'
import { UserAboutCard } from '@/src/components/cards/user/user-about-card'
import { UserGithubRepositoriesCard } from '@/src/components/cards/user/user-github-repositories-card'
import { UserEducationCard } from '@/src/components/cards/user/user-education-card'
import { UserExperienceCard } from '@/src/components/cards/user/user-experience-card'
import { UserSkillsCard } from '@/src/components/cards/user/user-skills-card'

// utils
import { getCurrentUser, getUsername } from '@/actions/user-actions'

// types
import { User } from '@/types/user-types'
import { GetUsernameResData } from '@/types/server-types'

interface UserProfilePage {
  params: {
    username: string
  }
}

/**
 * TODO:
 *
 * 1. Allow user to edit information for complete profile / each card if current user profile
 * 2. Error handling for not obtaining current user
 * 3. Error handling for not obtaining user from params
 */

const UserProfilePage: React.FC<UserProfilePage> = async ({ params }) => {
  if (!params?.username) return null

  const currentUser = await getCurrentUser()
  if (!currentUser) return null

  const user = await getUsername(params.username, {
    include: { addresses: true, userEducations: true, userExperiences: true },
  })
  if (!user) return null

  const userData: User = (user as GetUsernameResData).data
  const isCurrentUser = currentUser.id === userData.id

  return (
    <div className="flex flex-col gap-4">
      <UserCard isEditable={isCurrentUser} user={userData} />
      <UserAboutCard isEditable={isCurrentUser} user={userData} />
      <UserGithubRepositoriesCard isEditable={isCurrentUser} user={userData} />
      <UserExperienceCard isEditable={isCurrentUser} user={userData} />
      <UserEducationCard isEditable={isCurrentUser} user={userData} />
      <UserSkillsCard isEditable={isCurrentUser} user={userData} />
    </div>
  )
}

export default UserProfilePage
