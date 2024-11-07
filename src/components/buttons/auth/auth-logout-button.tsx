'use client'

// actions
import { authLogout } from '@/src/actions/auth-actions'

// components
import { Button } from '@/src/components/ui/button'

// utils
import { useRouter } from 'next/navigation'
import { useToast } from '@/src/hooks/use-toast'

export const AuthLogoutButton = () => {
  const router = useRouter()
  const { toast } = useToast()

  const logout = async () => {
    const response = await authLogout()

    if (response && !response.success && !response.errors) {
      toast({
        title: 'Error!',
        description: response.message,
        variant: 'destructive',
      })
    }

    if (response && response.success) {
      router.refresh()
    }
  }

  return (
    <Button type="submit" onClick={logout}>
      Logout
    </Button>
  )
}
