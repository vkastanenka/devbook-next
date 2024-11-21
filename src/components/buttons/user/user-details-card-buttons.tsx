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
import { useModal } from '@/src/hooks/use-modal-store'

// types
import { User } from '@vkastanenka/devbook-types/dist/user'

export const UserDetailsCardButtons: React.FC<{ user: User }> = ({ user }) => {
  const { onOpen } = useModal()

  let userPageLink = (
    <Link className="button-text muted" href={`/user/${user.username}/profile`}>
      Profile
      <CircleUserRound />
    </Link>
  )

  const pathname = usePathname()

  if (pathname.includes('/profile')) {
    userPageLink = (
      <Link className="button-text muted" href={`/user/${user.username}`}>
        Feed
        <Logs />
      </Link>
    )
  }

  return (
    <div className="flex gap-2">
      {userPageLink}
      <button
        className="button-text muted"
        onClick={() => onOpen('userContactInformation', { user })}
      >
        Contact info
        <Contact />
      </button>
      {user.resume && (
        <a className="button-text muted" href={user.resume} download>
          Resume
          <File />
        </a>
      )}
      {user.website && (
        <Link className="button-text muted" href={user.website} target="_blank">
          Website
          <LucideLink />
        </Link>
      )}
    </div>
  )
}
