// components
import { Card } from '@/src/components/ui/card'
import { Skeleton } from '@/src/components/ui/skeleton'

export const NoContentSearchResultCard = () => {
  return (
    <Card className="card">
      <div className="p-1 flex items-center gap-2 md:gap-4">
        <Skeleton className="w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-full" />
        <div className='flex flex-col gap-2'>
          <Skeleton className="w-[250px] h-[20px]" />
          <Skeleton className="w-[200px] h-[15px]" />
        </div>
      </div>
    </Card>
  )
}
