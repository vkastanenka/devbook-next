// components
import { Card as CardShadCn } from '@/components/ui/card'

// utils
import { cn } from '@/src/lib/utils'

interface Card {
  children: React.ReactNode
  className?: string
}

/**
 * TODO:
 * 
 * Delete and replace with class variable p-card
 */

export const Card: React.FC<Card> = ({ children, className }) => {
  return <CardShadCn className={cn('card', className)}>{children}</CardShadCn>
}
