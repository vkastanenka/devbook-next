// components
import {
  Avatar as AvatarShadCn,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { OverlayContainer } from '@/components/utils/overlay'

interface Avatar {
  hasOverlay?: boolean
  variant?: 'sm' | 'lg'
}

export const Avatar: React.FC<Avatar> = ({ hasOverlay = false, variant = 'sm' }) => {
  return (
    <AvatarShadCn className={variant === 'lg' ? 'avatar-lg' : 'avatar-sm'}>
      <OverlayContainer hasOverlay={hasOverlay}>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback className="bg-purple-400">VK</AvatarFallback>
      </OverlayContainer>
    </AvatarShadCn>
  )
}
