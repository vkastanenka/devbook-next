// components
import { Separator } from '@/src/components/ui/separator'
// import { UserCard } from '@/components/cards/user-card'
// import { CreatePostCard } from '@/components/cards/create-post-card'
// import { PostCard } from '@/components/cards/post-card'
// import { ContactsCard } from '@/components/cards/contacts-card'

// utils
import { getCurrentUser } from '@/src/lib/actions/auth'

const FeedPage: React.FC = async () => {
  const currentUser = await getCurrentUser()
  if (!currentUser) return null

  console.log(currentUser)

//   {
//   success: true,
//   message: 'Found current user!',
//   data: {
//     id: 'f1bdf45e-1b1c-11ec-9621-0242ac130002',
//     name: 'Victoria Kastanenka',
//     email: 'vkastanenka@gmail.com',
//     username: 'vkastanenka',
//     password: '$2a$12$TKOo.7FCLQPgjocuJRQSlOtJhFKcax1UNfD4fK57305OJC8IT0JLi',
//     emailVerified: null,
//     image: null,
//     headline: null,
//     bio: null,
//     role: 'USER',
//     resetPasswordToken: null,
//     resetPasswordTokenExpires: null,
//     passwordUpdatedAt: null,
//     createdAt: '2024-10-21T18:34:42.784Z',
//     updatedAt: '2024-10-21T18:49:36.432Z'
//   },
//   status: 200
// }

  return (
    <div className="flex gap-8">
      {/* user card */}
      <div className="basis-1/4">{/* <UserCard user={user} /> */}</div>
      {/* timeline */}
      <div className="basis-1/2 flex flex-col gap-4">
        {/* <CreatePostCard user={user} /> */}
        <Separator />
        {/* <PostCard /> */}
      </div>
      {/* contacts */}
      {/* <div className="basis-1/4">
        <ContactsCard />
      </div> */}
    </div>
  )
}

export default FeedPage
