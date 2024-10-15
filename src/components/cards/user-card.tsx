// components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

export const UserCard: React.FC = () => {
  return (
    <Card className="p-6 flex flex-col gap-4 bg-slate-900">
      <Avatar className="w-[72px] h-[72px]">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>VK</AvatarFallback>
      </Avatar>
      <div>
        <Typography.H4>Victoria Kastanenka</Typography.H4>
        <Typography.Muted>Software Engineer</Typography.Muted>
      </div>
    </Card>
  )
}
