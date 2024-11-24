'use client'

import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import Image from 'next/image'

import { cn, formatUserInitials } from '@/src/lib/utils'
import { User } from '@vkastanenka/devbook-types/dist/user'

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full', className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted',
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

interface UserAvatar {
  className?: string
  user: User
}

const UserAvatar: React.FC<UserAvatar> = ({ className, user }) => {
  const fallbackText = formatUserInitials(user.name)

  const [isLoaded, setIsLoaded] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (!user.image) setIsLoaded(true)
  }, [user.image])

  return (
    <Avatar
      className={cn('text-xs md:text-lg w-9 h-9 md:w-12 md:h-12', className)}
    >
      <AvatarImage asChild src={user.image || undefined}>
        <Image
          fill
          sizes="(min-width: 0px) 72px"
          alt={user.username}
          src={user.image || ''}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
          className={cn(
            'transition-opacity',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
        />
      </AvatarImage>
      <AvatarFallback
        className={cn(
          'transition-opacity bg-primary text-primary-foreground',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
      >
        {fallbackText}
      </AvatarFallback>
    </Avatar>
  )
}

export { Avatar, AvatarImage, AvatarFallback, UserAvatar }
