// components
import { NoContentCard } from '@/src/components/cards/no-content/no-content-card'
// import { Separator } from '@/src/components/ui/separator'
import { UserDetailsCard } from '@/components/cards/user/user-details-card'
import { UserBioCard } from '@/src/components/cards/user/user-bio-card'
// import { UserContactsCard } from '@/src/components/cards/user-contacts-card'

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
    include: { addresses: true },
  })
  if (!user) return null // TODO: Proper error handling

  // const userData: User = (user as GetUsernameResData).data

  return (
    <div className="flex gap-8">
      {/* user info */}
      <div className="basis-1/2 flex flex-col gap-4">
        {/* <UserDetailsCard user={userData} /> */}
        {/* {userData.bio && <UserBioCard user={userData} />} */}
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
