// components
import Link from 'next/link'

import { Avatar } from '@/components/primitives/avatar'
import { PostButton } from '@/components/buttons/post-button'

export const CreatePost = () => {
  return (
    <div className="flex gap-2">
      <Link href="/">
        <Avatar hasOverlay={true} />
      </Link>
      <PostButton>{`What's on your mind, Victoria?`}</PostButton>
    </div>
  )
}
