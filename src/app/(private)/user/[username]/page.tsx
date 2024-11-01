// components
import { NoContentCard } from '@/src/components/cards/no-content/no-content-card'
// import { Separator } from '@/src/components/ui/separator'
import { UserDetailsCard } from '@/components/cards/user/user-details-card'
import { UserBioCard } from '@/components/cards/user/user-bio-card'
import { UserContactsCard } from '@/src/components/cards/user/user-contacts-card'

// utils
import { getCurrentUser, getUsername } from '@/actions/user-actions'

// types
import { User } from '@/types/user-types'
import { GetUsernameResData } from '@/types/server-types'

interface UserPage {
  params: {
    username: string
  }
}

const UserPage: React.FC<UserPage> = async ({ params }) => {
  if (!params?.username) return null

  const currentUser = await getCurrentUser()
  if (!currentUser) return null

  const user = await getUsername(params.username, {
    include: { addresses: true, contacts: true },
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
    <div className="flex gap-8">
      {/* user info */}
      <div className="basis-1/2 flex flex-col gap-4">
        <UserDetailsCard
          currentUser={currentUser}
          isContact={isContact}
          isCurrentUser={isCurrentUser}
          user={userData}
        />
        <UserBioCard user={userData} />
        <UserContactsCard user={userData} />
        {/* {userData.contacts?.length && <UserContactsCard />} */}
      </div>
      {/* user feed */}
      <div className="basis-1/2">
        <NoContentCard
          heading="Nothing here yet!"
          subheading="Check back later."
        />
      </div>
    </div>
  )
}

export default UserPage
