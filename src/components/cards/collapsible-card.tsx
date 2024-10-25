'use client'

// components
import { Card as CardShadCn } from '@/components/ui/card'

// utils
import { cn } from '@/src/lib/utils'
import { useState } from 'react'
import { Typography } from '../ui/typography'

interface CollapsibleCard {
  children: React.ReactNode
  className?: string
  includeTrigger?: boolean
}

export const CollapsibleCard: React.FC<CollapsibleCard> = ({
  children,
  className,
  includeTrigger = true,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true)

  return (
    <CardShadCn className={cn('card', 'flex', 'flex-col', 'gap-2', className)}>
      <div
        className={cn(
          isCollapsed ? 'max-h-[150px]' : '',
          isCollapsed ? 'overflow-hidden' : '',
          isCollapsed && includeTrigger ? 'border-b-2' : ''
        )}
      >
        {children}
      </div>
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
          {isCollapsed && (
            <Typography.Muted className="text-accent">...</Typography.Muted>
          )}
          <Typography.Muted className="text-accent">
            {isCollapsed ? 'see more' : 'see less'}
          </Typography.Muted>
        </button>
      )}
    </CardShadCn>
  )
}
