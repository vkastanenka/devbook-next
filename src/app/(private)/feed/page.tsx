// components
import Link from 'next/link'

import { Separator } from '@/src/components/ui/separator'
import { UserCard } from '@/components/cards/user-card'
import { CreatePostCard } from '@/components/cards/create-post-card'
import { PostCard } from '@/components/cards/post-card'
import { ContactsCard } from '@/components/cards/contacts-card'

const FeedPage: React.FC = () => {
  return (
    <div className="flex gap-8">
      {/* user card */}
      <div className="basis-1/4">
        <Link href="/">
          <UserCard />
        </Link>
      </div>
      {/* timeline */}
      <div className="basis-1/2 flex flex-col gap-4">
        <CreatePostCard />
        <Separator />
        <PostCard />
      </div>
      {/* contacts */}
      <div className="basis-1/4">
        <ContactsCard />
      </div>
    </div>
  )
}

export default FeedPage
