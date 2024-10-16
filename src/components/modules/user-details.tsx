// components
import { Avatar } from '@/components/primitives/avatar'
import { Typography } from '@/components/ui/typography'

// utils
import { cn } from '@/src/lib/utils'

const styleText =
  'group-hover:!text-purple-400 group-focus-within:!text-purple-400'

interface UserDetails {
  variant?: 'sm' | 'lg'
}

export const UserDetails: React.FC<UserDetails> = ({ variant = 'sm' }) => {
  const NameEl = variant === 'sm' ? Typography.P : Typography.H4

  return (
    <div
      className={cn(
        'flex',
        ...(variant === 'sm' ? ['items-center gap-2'] : []),
        ...(variant === 'lg' ? ['flex-col gap-4'] : [])
      )}
    >
      <Avatar variant={variant} />
      <div className={styleText}>
        <NameEl>Victoria Kastanenka</NameEl>
        <Typography.Muted className={cn('text-slate-400', styleText)}>
          Software Engineer
        </Typography.Muted>
      </div>
    </div>
  )
}
