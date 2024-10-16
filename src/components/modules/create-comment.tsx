// components
import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CreateCommentButton } from '@/components/buttons/create-comment-button'
import { CommentForm } from '@/components/forms/comment-form'
import { Overlay } from '@/components/utils/overlay'

export const CreateComment: React.FC = () => {
  return (
    <div className="px-card flex gap-2 dark:bg-slate-900">
      <Link className="group" href="/">
        <Avatar className="relative avatar-sm overflow-hidden">
          <Overlay />
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className="bg-purple-400">VK</AvatarFallback>
        </Avatar>
      </Link>
      <CreateCommentButton />
      {/* <CommentForm /> */}
    </div>
  )
}
