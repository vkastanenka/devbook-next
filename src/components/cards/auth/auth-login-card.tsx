// components
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AuthLoginForm } from '@/components/forms/auth/auth-login-form'
import { Separator } from '@radix-ui/react-separator'

export const AuthLoginCard = () => {
  return (
    <Card className="card form-card">
      <AuthLoginForm />

      <div className="text-center">
        <Link href="/recover-password">
          <p className="p">Forgot password?</p>
        </Link>
      </div>

      <Separator className="separator" />

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
