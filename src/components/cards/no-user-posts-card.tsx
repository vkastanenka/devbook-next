// components
import { Card } from '@/components/primitives/card'
import { Typography } from '@/components/ui/typography'

export const NoUserPostsCard = () => {
  return (
    <Card className="text-center">
      <Typography.H3>Welcome to Devbook!</Typography.H3>
      <Typography.P>Create a post above to get started.</Typography.P>
    </Card>
  )
}
