// components
import Link from 'next/link'

import { Avatar } from '@/components/primitives/avatar'
import { CreatePostButton } from '@/src/components/modules/buttons/create-post-button'

// types
import { User } from '@/types/user-types'

interface CreatePost {
  user: User
}

export const CreatePost: React.FC<CreatePost> = ({ user }) => {
  return (
    <div className="flex gap-2">
      {/* TODO: Add overlay */}
      <Link className="rounded-full" href={`/user/${user.username}`}>
        <Avatar src={user.image || undefined} />
      </Link>
      <CreatePostButton user={user} />
    </div>
  )
}
