// actions
import { userReadCurrentUser } from '@/src/actions/user-actions'
import { userReadUsername } from '@/src/actions/user-actions'

// components
import { NoContentCard } from '@/src/components/cards/no-content/no-content-card'
import { UserBioCard } from '@/src/components/cards/user/user-bio-card'
import { UserDetailsCard } from '@/components/cards/user/user-details-card'
import { UserEducationCard } from '@/src/components/cards/user/user-education-card'
import { UserExperienceCard } from '@/src/components/cards/user/user-experience-card'
import { UserGithubReposCard } from '@/src/components/cards/user/user-github-repos-card'
import { UserSkillsCard } from '@/src/components/cards/user/user-skills-card'

// utils
import { redirect } from 'next/navigation'

// types

interface UserProfilePage {
  params: {
    username: string
  }
}

const UserProfilePage: React.FC<UserProfilePage> = async ({ params }) => {
  if (!params?.username) redirect('/feed')

  const { data: currentUser, message: currentUserResMessage } =
    await userReadCurrentUser()

  if (!currentUser) {
    return <NoContentCard heading="Error!" subheading={currentUserResMessage} />
  }

  let isCurrentUser = true
  let user = currentUser

  if (currentUser.username !== params.username) {
    isCurrentUser = false

    const { data: userData, message: userMessage } = await userReadUsername(
      params.username
    )

    if (!userData) {
      return <NoContentCard heading="Error!" subheading={userMessage} />
    }

    user = userData
  }

  return (
    <div className="flex flex-col gap-4">
      <UserDetailsCard
        currentUser={currentUser}
        isEditable={isCurrentUser}
        user={user}
      />
      <UserBioCard
        isCurrentUser={isCurrentUser}
        isEditable={isCurrentUser}
        user={user}
      />
      <UserGithubReposCard
        isCurrentUser={isCurrentUser}
        isEditable={isCurrentUser}
        user={user}
      />
      <UserExperienceCard
        isCurrentUser={isCurrentUser}
        isEditable={isCurrentUser}
        user={user}
      />
      <UserEducationCard
        isCurrentUser={isCurrentUser}
        isEditable={isCurrentUser}
        user={user}
      />
      <UserSkillsCard
        isCurrentUser={isCurrentUser}
        isEditable={isCurrentUser}
        user={user}
      />
    </div>
  )
}

export default UserProfilePage
