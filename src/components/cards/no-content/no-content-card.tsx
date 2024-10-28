// components
import { Card } from '@/components/primitives/card'

// utils
import { cn } from '@/src/lib/utils'

export const NoContentCard: React.FC<{
  heading: string
  subheading?: string
  className?: string
}> = ({ heading, subheading, className }) => (
  <Card className={cn('text-center', className)}>
    <p className="h4">{heading}</p>
    {subheading && <p className="p">{subheading}</p>}
  </Card>
)
