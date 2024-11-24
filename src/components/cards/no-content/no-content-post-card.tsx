// components
import { Card } from '@/src/components/ui/card'
import { Separator } from '@/src/components/ui/separator'
import { Skeleton } from '@/src/components/ui/skeleton'

// svg
import { MessageSquareText, ThumbsUp } from 'lucide-react'

export const NoContentPostCard = () => {
  const styleButton =
    'gap-1 flex justify-center items-center py-1 px-1 md:py-3 md:px-2'

  return (
    <Card className="relative py-4 md:py-card bg-card flex flex-col gap-4 pointer-events-none">
      <div className="px-4 md:px-card flex items-center gap-2">
        <Skeleton className="w-9 h-9 md:w-12 md:h-12 rounded-full" />
        <div className="flex flex-col gap-1">
          <Skeleton className="w-[150px] h-[20px]" />
          <Skeleton className="w-[150px] h-[20px]" />
        </div>
      </div>
      <div className="px-4 md:px-card flex flex-col gap-2">
        <Skeleton className="w-full h-[125px]" />
        <Skeleton className="w-[150px] h-[20px]" />
      </div>
      <div className="px-4 md:px-card flex justify-between text-accent">
        <div className="flex justify-center gap-1">
          <ThumbsUp className="w-4" />
          <Skeleton className="w-[20px] h-[20px]" />
        </div>
        <div className="flex justify-center gap-1">
          <MessageSquareText className="w-4" />
          <Skeleton className="w-[20px] h-[20px]" />
        </div>
      </div>
      <Separator />
      <div className="px-4 md:px-card flex items-center justify-between gap-1 w-full">
        <div className="flex items-center gap-2">
          <div className={styleButton}>
            <ThumbsUp />
            <div className="hidden md:block">Like</div>
          </div>
          <div className={styleButton}>
            <MessageSquareText />
            <div className="hidden md:block">Comment</div>
          </div>
        </div>
      </div>
    </Card>
  )
}
