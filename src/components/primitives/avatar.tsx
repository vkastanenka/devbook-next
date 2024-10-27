// components
import {
  Avatar as AvatarShadCn,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'

interface Avatar {
  src?: string
  className?: string
}

/**
 * TODO:
 *
 * Find better home and implementation
 * Image optimization with next image https://github.com/shadcn-ui/ui/issues/368
 */

export const Avatar: React.FC<Avatar> = ({ src, className }) => {
  return (
    <AvatarShadCn className={className}>
      <AvatarImage src={src} />
      <AvatarFallback className="bg-primary">VK</AvatarFallback>
    </AvatarShadCn>
  )
}
