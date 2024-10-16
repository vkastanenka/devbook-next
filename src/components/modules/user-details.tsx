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
        <Typography.H4>Victoria Kastanenka</Typography.H4>
        <Typography.Muted className={cn('text-slate-400', styleText)}>
          Software Engineer
        </Typography.Muted>
      </div>
    </div>
  )
}
