// utils
import { cn } from '@/src/lib/utils'

export const OverlayDiv: React.FC = () => {
  return (
    <div className="pointer-events-none hidden group-hover:block group-focus-within:block bg-white/10 rounded-lg absolute top-0 bottom-0 right-0 left-0 z-20" />
  )
}

interface Overlay {
  children: React.ReactNode
  className?: string
  hasOverlay?: boolean
}

export const Overlay: React.FC<Overlay> = ({
  children,
  className,
  hasOverlay = true,
}) => {
  return (
    <div
      className={cn(hasOverlay ? 'group relative' : '', className)}
    >
      <OverlayDiv />
      {children}
    </div>
  )
}
