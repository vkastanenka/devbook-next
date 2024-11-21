'use client'

// actions
import { authLogout } from '@/src/actions/auth-actions'

// components
import { Button } from '@/src/components/ui/button'

// utils
import { useToast } from '@/src/hooks/use-toast'

export const AuthLogoutButton = () => {
  const { toast } = useToast()

  const logout = async () => {
    const response = await authLogout()

    if (!response.success) {
      toast({
        title: 'Error!',
        description: response.message,
        variant: 'destructive',
      })
    }
  }

  return (
    <Button type="submit" onClick={logout}>
      Logout
    </Button>
  )
}
