// components
import {
  Avatar as AvatarShadCn,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'

interface Avatar {
  src?: string
  variant?: 'sm' | 'lg'
}

// TODO: Image optimization with next image https://github.com/shadcn-ui/ui/issues/368
export const Avatar: React.FC<Avatar> = ({ src, variant = 'sm' }) => {
  return (
    <AvatarShadCn className={variant === 'lg' ? 'avatar-lg' : 'avatar-sm'}>
      <AvatarImage src={src || 'https://github.com/shadcn.png'} />
      <AvatarFallback className="bg-purple-400">VK</AvatarFallback>
    </AvatarShadCn>
  )
}
