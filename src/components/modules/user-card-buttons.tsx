'use client'

// components
import Link from 'next/link'
import { Typography } from '@/components/ui/typography'

// svg
import {
  CircleUserRound,
  Logs,
  Contact,
  File,
  Link as LucideLink,
} from 'lucide-react'

// utils
import { usePathname } from 'next/navigation'
import { useModal } from '@/hooks/use-modal-store'

// types
import { User } from '@/types/user-types'

export const UserCardButtons: React.FC<{ user: User }> = ({ user }) => {
  const { onOpen } = useModal()

  let userPageLink = (
    <Link href={`/user/${user.username}/profile`}>
      <Typography.Muted>Profile</Typography.Muted>
      <CircleUserRound />
    </Link>
  )

  const pathname = usePathname()

  if (pathname.includes('/profile')) {
    userPageLink = (
      <Link href={`/user/${user.username}`}>
        <Typography.Muted>Feed</Typography.Muted>
        <Logs />
      </Link>
    )
  }

  return (
    <div className="flex gap-4 [&>*]:inline-flex [&>*]:items-center [&>*]:gap-1 [&>*]:is-interactive [&>*]:text-purple-400">
      {userPageLink}
      <button onClick={() => onOpen('userContactInformation', { user })}>
        <Typography.Muted>Contact info</Typography.Muted>
        <Contact />
      </button>
      {user.resume && (
        <a href={user.resume} download>
          <Typography.Muted>Resume</Typography.Muted>
          <File />
        </a>
      )}
      {user.website && (
        <Link href={user.website} target="_blank">
          <Typography.Muted>Website</Typography.Muted>
          <LucideLink />
        </Link>
      )}
    </div>
  )
}
