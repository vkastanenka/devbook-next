'use client'

// utils
import { cn } from '@/src/lib/utils'
import { useState } from 'react'
import { Separator } from '@/src/components/ui/separator'

interface CollapsibleContent {
  children: React.ReactNode
  className?: string
  includeTrigger?: boolean
}

export const CollapsibleContent: React.FC<CollapsibleContent> = ({
  children,
  className,
  includeTrigger = true,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true)

  return (
    <div className={cn('flex', 'flex-col', 'gap-2', className)}>
      <div
        className={cn(
          className,
          isCollapsed && includeTrigger ? 'max-h-[150px]' : '',
          isCollapsed && includeTrigger ? 'overflow-hidden' : ''
        )}
      >
        {children}
      </div>
      {isCollapsed && includeTrigger && <Separator className="separator" />}
      {includeTrigger && (
        <button
          className={cn(
            'w-full button-text text-card-foreground gap-2',
            isCollapsed ? 'justify-between' : 'justify-end'
          )}
          onClick={() => setIsCollapsed((prevState) => !prevState)}
        >
          {isCollapsed && <span>...</span>}
          <span>{isCollapsed ? 'see more' : 'see less'}</span>
        </button>
      )}
    </div>
  )
}
