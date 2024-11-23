'use client'

// actions
import { authLogout } from '@/src/actions/auth-actions'

// components
import { Button } from '@/src/components/ui/button'

export const AuthLogoutButton = () => {
  const logout = async () => {
    await authLogout()
  }

  return (
    <Button type="submit" onClick={logout}>
      Logout
    </Button>
  )
}
