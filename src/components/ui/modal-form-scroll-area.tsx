// components
import { ScrollArea } from './scroll-area'

// utils
import { cn } from '@/src/lib/utils'

interface ModalFormScrollArea {
  children: React.ReactNode
  className?: string
}

export const ModalFormScrollArea: React.FC<ModalFormScrollArea> = ({
  children,
  className,
}) => {
  return (
    <ScrollArea className={cn('h-[40vh]', className)}>
      <div className="flex flex-col gap-4 pl-2 pr-5">{children}</div>
      <div className='py-1'></div>
    </ScrollArea>
  )
}
