// components
import { Avatar } from '@/components/primitives/avatar'
import { Typography } from '@/components/ui/typography'

// utils
import { cn } from '@/src/lib/utils'

// types
import { User } from '@/lib/types'

const styleText =
  'group-hover:!text-purple-400 group-focus-within:!text-purple-400'

interface UserDetails {
  user: User
  variant?: 'sm' | 'lg'
}

export const UserDetails: React.FC<UserDetails> = ({
  user,
  variant = 'sm',
}) => {
  const NameEl = variant === 'sm' ? Typography.P : Typography.H4

  console.log(user)

  return (
    <div
      className={cn(
        'flex',
        ...(variant === 'sm' ? ['items-center gap-2'] : []),
        ...(variant === 'lg' ? ['flex-col gap-4'] : [])
      )}
    >
      <Avatar src={user.image} variant={variant} />
      <div className={styleText}>
        <NameEl>{user.name}</NameEl>
        <Typography.Muted className={cn('text-slate-400', styleText)}>
          {user.headline}
        </Typography.Muted>
      </div>
    </div>
  )
}
