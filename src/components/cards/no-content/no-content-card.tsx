// components
import { Card } from '@/src/components/ui/card'

// utils
import { cn } from '@/src/lib/utils'

/**
 * TODO
 * 
 * Figure out complete implementation for all types of cards
 */

export const NoContentCard: React.FC<{
  heading: string
  subheading?: string
  className?: string
}> = ({ heading, subheading, className }) => (
  <Card className={cn('card text-center', className)}>
    <p className="h4">{heading}</p>
    {subheading && <p className="p">{subheading}</p>}
  </Card>
)
