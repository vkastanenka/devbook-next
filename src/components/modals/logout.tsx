'use client'

// components
import { Button } from '@/components/ui/button'

// utils
import { logout } from '@/lib/actions/auth'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

export const LogoutModal = () => {
  const router = useRouter()
  const { toast } = useToast()

  const action: () => void = async () => {
    try {
      await logout()
      router.push('/')
    } catch {
      toast({
        title: 'Error',
        description: 'Error logging out',
      })
    }
  }

  return (
    <form action={action}>
      <Button type="submit">Logout</Button>
    </form>
  )
}
