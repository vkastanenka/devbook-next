// components
import { Avatar } from '@/components/primitives/avatar'
import { Typography } from '@/components/ui/typography'

// utils
import { cn } from '@/src/lib/utils'

// types
import { User } from '@/lib/types'

interface UserDetails {
  user: User
  variant?: 'sm' | 'lg'
}

export const UserDetails: React.FC<UserDetails> = ({
  user,
  variant = 'sm',
}) => {
  const NameEl = variant === 'sm' ? Typography.P : Typography.H4

  return (
    <div
      className={cn(
        'flex',
        ...(variant === 'sm' ? ['items-center gap-2'] : []),
        ...(variant === 'lg' ? ['flex-col gap-4'] : [])
      )}
    >
      <Avatar src={user.image || undefined} variant={variant} />
      <div>
        <NameEl>{user.name}</NameEl>
        <Typography.Muted className="text-accent">
          {user.headline}
        </Typography.Muted>
      </div>
    </div>
  )
}
