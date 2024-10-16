import Link from 'next/link'

import { Avatar } from '@/components/primitives/avatar'
import { Overlay } from '@/components/utils/overlay'
import { PostButton } from '@/components/buttons/post-button'

export const CreateComment = () => {
  return (
    <div className="flex gap-2">
      <Overlay>
        <Link href="/">
          <Avatar />
        </Link>
      </Overlay>
      <PostButton>{`Leave a comment!`}</PostButton>
    </div>
  )
}
