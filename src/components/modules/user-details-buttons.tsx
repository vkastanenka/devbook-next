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

// types
import { User } from '@/lib/types'

export const UserDetailsButtons: React.FC<{ user: User }> = ({ user }) => {
  let UserPageLink = () => (
    <Link href={`/user/${user.username}/profile`}>
      <Typography.Muted>Profile</Typography.Muted>
      <CircleUserRound />
    </Link>
  )

  const pathname = usePathname()

  if (pathname.includes('/profile')) {
    UserPageLink = () => (
      <Link href={`/user/${user.username}`}>
        <Typography.Muted>Feed</Typography.Muted>
        <Logs />
      </Link>
    )
  }

  return (
    <div className="flex gap-4 [&>*]:inline-flex [&>*]:items-center [&>*]:gap-1 [&>*]:is-interactive [&>*]:text-purple-400">
      <UserPageLink />
      {/* {user.contactInfo && <button>
        <Typography.Muted>Contact info</Typography.Muted>
        <Contact />
      </button>} */}
      {/* {user.resume && (
        <button>
          <Typography.Muted>Resume</Typography.Muted>
          <File />
        </button>
      )} */}
      {/* {user.website && (
        <button>
          <Typography.Muted>Website</Typography.Muted>
          <LucideLink />
        </button>
      )} */}
    </div>
  )
}
