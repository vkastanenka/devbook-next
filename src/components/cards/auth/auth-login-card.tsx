// components
import Link from 'next/link'
import { Card } from '@/src/components/ui/card'
import { Button } from '@/src/components/ui/button'
import { Separator } from '@/src/components/ui/separator'

// forms
import { AuthLoginForm } from '@/src/components/forms/auth/auth-login-form'

export const AuthLoginCard = () => {
  return (
    <Card className="card form-card text-center">
      <AuthLoginForm />

      <Link className="button-text" href="/recover-password">
        Forgot password?
      </Link>

      <Separator />

      <Link className="button-text" href="/register">
        <Button tabIndex={-1}>Create new account</Button>
      </Link>
    </Card>
  )
}
