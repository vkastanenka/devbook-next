// utils
import { cn } from '@/src/lib/utils'

export const Overlay: React.FC = () => {
  return (
    <div className="pointer-events-none hidden group-hover:block group-focus-within:block w-full h-full rounded-lg bg-white/10 absolute top-0 left-0 z-20" />
  )
}

export const OverlayContainer: React.FC<{
  hasOverlay?: boolean
  children: React.ReactNode
}> = ({ hasOverlay = true, children }) => {
  return (
    <div
      className={cn(
        'w-full',
        hasOverlay ? 'group relative overflow-hidden' : ''
      )}
    >
      <Overlay />
      {children}
    </div>
  )
}
