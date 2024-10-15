// components
import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Overlay } from '@/components/utils/overlay'
import { Typography } from '@/components/ui/typography'

export const UserCard: React.FC = () => {
  return (
    <Link href="/" className="group">
      <Card className="relative dark:bg-slate-900 text-left overflow-hidden">
        <Overlay />
        <div className="p-6 flex flex-col gap-4">
          <Avatar className="avatar-lg">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-purple-400">VK</AvatarFallback>
          </Avatar>
          <div>
            <Typography.H4>Victoria Kastanenka</Typography.H4>
            <Typography.Muted>Software Engineer</Typography.Muted>
          </div>
        </div>
      </Card>
    </Link>
  )
}
