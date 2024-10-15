// components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

export const CreatePostCard: React.FC = () => {
  return (
    <Card className="p-6 flex gap-2 bg-slate-900">
      <Avatar className="w-[48px] h-[48px]">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>VK</AvatarFallback>
      </Avatar>
      <div className="basis-full rounded-full bg-slate-800 border-[1px] border-slate-500 text-slate-500 px-[12px] py-2">
        <Typography.P>{`What's on your mind, Victoria?`}</Typography.P>
      </div>
    </Card>
  )
}
