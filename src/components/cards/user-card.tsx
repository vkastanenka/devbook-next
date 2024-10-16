// components
import { Card } from '@/components/primitives/card'
import { OverlayContainer } from '@/components/utils/overlay'
import { UserDetails } from '@/components/modules/user-details'

export const UserCard: React.FC = () => {
  return (
    <OverlayContainer>
      <Card>
        <UserDetails variant="lg" />
      </Card>
    </OverlayContainer>
  )
}
