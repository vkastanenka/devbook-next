// components
import Link from 'next/link'
import { Card } from '@/src/components/ui/card'
import { Button } from '@/src/components/ui/button'
import { Separator } from '@/src/components/ui/separator'

// forms
import { AuthLoginForm } from '@/src/components/forms/auth/auth-login-form'

export const AuthLoginCard = () => {
  return (
    <Card className="card form-card">
      <AuthLoginForm />

      <div className="text-center">
        <Link href="/recover-password">
          <p className="p">Forgot password?</p>
        </Link>
      </div>

      <Separator />

      <div className="text-center">
        <Link href="/register">
          <Button tabIndex={-1}>
            <p className="p">Create new account</p>
          </Button>
        </Link>
      </div>
    </Card>
  )
}
