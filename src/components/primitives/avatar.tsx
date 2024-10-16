// components
import {
  Avatar as AvatarShadCn,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'

interface Avatar {
  variant?: 'sm' | 'lg'
}

export const Avatar: React.FC<Avatar> = ({ variant = 'sm' }) => {
  return (
    <AvatarShadCn className={variant === 'lg' ? 'avatar-lg' : 'avatar-sm'}>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback className="bg-purple-400">VK</AvatarFallback>
    </AvatarShadCn>
  )
}
