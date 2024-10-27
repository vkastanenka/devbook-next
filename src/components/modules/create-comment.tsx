import Link from 'next/link'

import { Avatar } from '@/components/primitives/avatar'
import { PostButton } from '@/src/components/modules/buttons/post-button'

export const CreateComment = () => {
  return (
    <div className="flex gap-2">
      <Link href="/">
        <Avatar />
      </Link>
      <PostButton>{`Leave a comment!`}</PostButton>
    </div>
  )
}
