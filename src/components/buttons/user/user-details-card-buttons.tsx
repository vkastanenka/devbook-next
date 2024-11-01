'use client'

// components
import Link from 'next/link'

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

export const UserDetailsCardButtons: React.FC<{ user: User }> = ({ user }) => {
  const { onOpen } = useModal()

  let userPageLink = (
    <Link href={`/user/${user.username}/profile`}>
      <p className="muted">Profile</p>
      <CircleUserRound />
    </Link>
  )

  const pathname = usePathname()

  if (pathname.includes('/profile')) {
    userPageLink = (
      <Link href={`/user/${user.username}`}>
        <p className="muted">Feed</p>
        <Logs />
      </Link>
    )
  }

  return (
    <div className="flex gap-4 [&>*]:inline-flex [&>*]:items-center [&>*]:gap-1 [&>*]:is-interactive [&>*]:text-purple-400">
      {userPageLink}
      <button onClick={() => onOpen('userContactInformation', { user })}>
        <p className="muted">Contact info</p>
        <Contact />
      </button>
      {user.resume && (
        <a href={user.resume} download>
          <p className="muted">Resume</p>
          <File />
        </a>
      )}
      {user.website && (
        <Link href={user.website} target="_blank">
          <p className="muted">Website</p>
          <LucideLink />
        </Link>
      )}
    </div>
  )
}
