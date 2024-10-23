// components
import { Avatar } from '@/components/primitives/avatar'
import { Typography } from '@/components/ui/typography'

// utils
import { cn } from '@/src/lib/utils'

// types
import { User } from '@/lib/types'

interface UserDetails {
  user: User
  variant?: 'sm' | 'lg' | 'xl'
  include?: {
    pronouns?: boolean
    links?: boolean
    location?: boolean
  }
}

export const UserDetails: React.FC<UserDetails> = ({
  user,
  variant = 'sm',
  // include,
}) => {
  let NameEl = Typography.P
  let containerStyles = ['items-center gap-2']

  switch (variant) {
    case 'xl':
      NameEl = Typography.H3
      containerStyles = ['flex-col gap-4']
      break
    case 'lg':
      NameEl = Typography.H4
      containerStyles = ['flex-col gap-4']
      break
    case 'sm':
      break
    default:
      break
  }

  return (
    <div className={cn('flex', ...containerStyles)}>
      <Avatar src={user.image || undefined} variant={variant} />
      <div>
        <div>
          <NameEl>{user.name}</NameEl>
          {/* {include?.pronouns && user.pronouns && (
            <Typography.Muted>{user.pronouns}</Typography.Muted>
          )} */}
        </div>
        <Typography.Muted className="text-accent">
          {user.headline}
        </Typography.Muted>
      </div>
      {/* {include?.links && <Links />} */}
      {/* {include?.location && <Location />} */}
    </div>
  )
}
