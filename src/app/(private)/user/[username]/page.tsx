// components
import { NoContentCard } from '@/src/components/cards/no-content/no-content-card'
// import { Separator } from '@/src/components/ui/separator'
import { UserDetailsCard } from '@/components/cards/user/user-details-card'
// import { UserBioCard } from '@/components/cards/user/user-bio-card'
// import { UserContactsCard } from '@/src/components/cards/user/user-contacts-card'

// utils
import { readCurrentUser } from '@/actions/user-actions'
import { readUsername } from '@/actions/user-actions'
import { redirect } from 'next/navigation'

interface UserPage {
  params: {
    username: string
  }
}

const UserPage: React.FC<UserPage> = async ({ params }) => {
  if (!params?.username) redirect('/feed')

  const { data: currentUser, message: currentUserResMessage } =
    await readCurrentUser({
      include: { contacts: { orderBy: { name: 'asc' } } },
    })

  if (!currentUser) {
    return <NoContentCard heading="Error!" subheading={currentUserResMessage} />
  }

  const { data: user, message: userResMessage } = await readUsername(
    params.username,
    { include: { contacts: { orderBy: { name: 'asc' } } } }
  )

  if (!user) {
    return <NoContentCard heading="Error!" subheading={userResMessage} />
  }

  return (
    <div className="flex gap-8">
      <div className="basis-1/2 flex flex-col gap-4">
        <UserDetailsCard currentUser={currentUser} user={user} />
        {/* <UserBioCard user={user} /> */}
        {/* <UserContactsCard user={userData} /> */}
      </div>
      {/* <div className="basis-1/2">
        <NoContentCard
          heading="Nothing here yet!"
          subheading="Check back later."
        />
      </div> */}
    </div>
  )
}

export default UserPage
