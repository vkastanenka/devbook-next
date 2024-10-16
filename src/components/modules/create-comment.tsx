import Link from 'next/link'

import { Avatar } from '@/components/primitives/avatar'
import { PostButton } from '@/components/buttons/post-button'

export const CreateComment = () => {
  return (
    <div className="flex gap-2">
      <Link href="/">
        <Avatar hasOverlay={true} />
      </Link>
      <PostButton>{`Leave a comment!`}</PostButton>
    </div>
  )
}
