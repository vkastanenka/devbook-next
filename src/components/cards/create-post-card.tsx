// components
import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { CreatePostButton } from '@/components/buttons/create-post-button'
import { Overlay } from '@/components/utils/overlay'

export const CreatePostCard: React.FC = () => {
  return (
    <Card className="p-6 flex gap-2 dark:bg-slate-900">
      <Link className="group" href="/">
        <Avatar className="relative avatar-sm overflow-hidden">
          <Overlay />
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className="bg-purple-400">VK</AvatarFallback>
        </Avatar>
      </Link>
      <CreatePostButton />
    </Card>
  )
}
