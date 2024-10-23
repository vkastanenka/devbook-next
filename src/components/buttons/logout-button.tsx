'use client'

// components
import { Button } from '@/components/ui/button'

// utils
import { logout } from '@/lib/actions/auth'
import { useRouter } from 'next/navigation'

export const LogoutButton = () => {
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
