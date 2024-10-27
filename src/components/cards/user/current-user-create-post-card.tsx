// components
import Link from 'next/link'
import { Avatar } from '@/components/primitives/avatar'
import { CreatePostButton } from '@/src/components/modules/buttons/create-post-button'
import { Card } from '@/components/primitives/card'

// utils
import { getCurrentUser } from '@/actions/auth-actions'

/**
 * TODO:
 *
 * 1. Update create post button
 */

export const CurrentUserCreatePostCard = async () => {
  const currentUser = await getCurrentUser()
  if (!currentUser) return null

  return (
    <Card>
      <Link className="rounded-full" href={`/user/${currentUser.username}`}>
        <Avatar src={currentUser.image || undefined} />
      </Link>
      <CreatePostButton user={currentUser} />
    </Card>
  )
}
