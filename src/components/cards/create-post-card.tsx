// components
import { Card } from '@/components/primitives/card'
import { CreatePost } from '@/components/modules/create-post'

// types
import { User } from '@/lib/types'

interface CreatePostCard {
  user: User
}

export const CreatePostCard: React.FC<CreatePostCard> = ({ user }) => {
  return (
    <Card>
      <CreatePost user={user} />
    </Card>
  )
}
