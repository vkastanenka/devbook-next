// components
import Link from 'next/link'

import { Avatar } from '@/components/primitives/avatar'
import { Overlay } from '@/components/utils/overlay'
import { CreatePostButton } from '@/components/buttons/create-post-button'

export const CreatePost = () => {
  return (
    <div className="flex gap-2">
      <Overlay>
        <Link href="/">
          <Avatar />
        </Link>
      </Overlay>
      <CreatePostButton />
    </div>
  )
}
