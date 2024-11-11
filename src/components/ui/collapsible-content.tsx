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
            'text-accent',
            'py-1',
            'is-interactive',
            'flex',
            'items-center',
            isCollapsed ? 'justify-between' : 'justify-end'
          )}
          onClick={() => setIsCollapsed((prevState) => !prevState)}
        >
          {isCollapsed && <p className="muted text-accent">...</p>}
          <p className="muted text-accent">
            {isCollapsed ? 'see more' : 'see less'}
          </p>
        </button>
      )}
    </div>
  )
}
