// components
import Link from 'next/link'

import { Card } from '@/components/ui/card'
import { Overlay } from '@/components/utils/overlay'
import { UserDetails } from '@/components/modules/user-details'

export const UserCard: React.FC = () => {
  return (
    <Card>
      <Overlay>
        <Link href="/">
          <div className="card">
            <UserDetails variant="lg" />
          </div>
        </Link>
      </Overlay>
    </Card>
  )
}
