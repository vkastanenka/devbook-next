// components
import { Card } from '@/components/primitives/card'
import { Typography } from '@/components/ui/typography'

// utils
import { cn } from '@/src/lib/utils'

export const NoContentCard: React.FC<{
  heading: string
  subheading?: string
  className?: string
}> = ({ heading, subheading, className }) => (
  <Card className={cn('text-center', className)}>
    <Typography.H4>{heading}</Typography.H4>
    {subheading && <Typography.P>{subheading}</Typography.P>}
  </Card>
)
