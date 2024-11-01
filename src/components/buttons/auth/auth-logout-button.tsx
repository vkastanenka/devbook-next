'use client'

// components
import { Button } from '@/components/ui/button'

// utils
import { logout } from '@/actions/auth-actions'
import { useRouter } from 'next/navigation'

/**
 * TODO:
 *
 * 1. Server error handling
 */

export const AuthLogoutButton = () => {
  const router = useRouter()

  const action: () => void = async () => {
    await logout()
    router.push('/')
  }

  return (
    <form action={action}>
      <Button type="submit">Logout</Button>
    </form>
  )
}
