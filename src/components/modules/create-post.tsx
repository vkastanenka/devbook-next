// components
import Link from 'next/link'

import { Avatar } from '@/components/primitives/avatar'
import { Overlay } from '@/components/utils/overlay'
import { PostButton } from '@/components/buttons/post-button'

export const CreatePost = () => {
  return (
    <div className="flex gap-2">
      <Overlay>
        <Link href="/">
          <Avatar />
        </Link>
      </Overlay>
      <PostButton>{`What's on your mind, Victoria?`}</PostButton>
    </div>
  )
}
