// components
import { UserBioCard } from '@/src/components/cards/user/user-bio-card'
import { UserDetailsCard } from '@/components/cards/user/user-details-card'
import { UserEducationCard } from '@/src/components/cards/user/user-education-card'
import { UserExperienceCard } from '@/src/components/cards/user/user-experience-card'
import { UserGithubReposCard } from '@/src/components/cards/user/user-github-repos-card'
import { UserSkillsCard } from '@/src/components/cards/user/user-skills-card'

// utils
import { getCurrentUser, getUsername } from '@/actions/user-actions'

// types
import { GetUsernameResData } from '@/types/server-types'
import { User } from '@/types/user-types'

interface UserProfilePage {
  params: {
    username: string
  }
}

const UserProfilePage: React.FC<UserProfilePage> = async ({ params }) => {
  if (!params?.username) return null

  const currentUser = await getCurrentUser()
  if (!currentUser) return null

  const user = await getUsername(params.username, {
    include: {
      addresses: true,
      contacts: true,
      userEducations: true,
      userExperiences: true,
    },
  })
  if (!user) return null

  const userData: User = (user as GetUsernameResData).data

  // Check if user is current user
  const isCurrentUser = currentUser.id === userData.id

  // Check if current user in user contacts
  let isContact
  if (!isCurrentUser && userData.contacts && userData.contacts.length > 0) {
    userData.contacts.every((contact) => {
      if (contact.id === currentUser.id) {
        isContact = true
        return false
      }
      return true
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <UserDetailsCard
        currentUser={currentUser}
        isContact={isContact}
        isCurrentUser={isCurrentUser}
        isEditable={isCurrentUser}
        user={userData}
      />
      <UserBioCard
        isCurrentUser={isCurrentUser}
        isEditable={isCurrentUser}
        user={userData}
      />
      <UserGithubReposCard
        isCurrentUser={isCurrentUser}
        isEditable={isCurrentUser}
        user={userData}
      />
      <UserExperienceCard
        isCurrentUser={isCurrentUser}
        isEditable={isCurrentUser}
        user={userData}
      />
      <UserEducationCard
        isCurrentUser={isCurrentUser}
        isEditable={isCurrentUser}
        user={userData}
      />
      <UserSkillsCard
        isCurrentUser={isCurrentUser}
        isEditable={isCurrentUser}
        user={userData}
      />
    </div>
  )
}

export default UserProfilePage
