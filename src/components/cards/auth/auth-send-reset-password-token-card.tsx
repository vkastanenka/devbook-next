// components
import Link from 'next/link'
import { Card } from '@/src/components/ui/card'
import { Separator } from '@/src/components/ui/separator'

// forms
import { AuthSendResetPasswordTokenForm } from '@/src/components/forms/auth/auth-send-reset-password-token-form'

export const AuthSendResetPasswordTokenCard = () => {
  return (
    <Card className="card form-card text-center">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="h3">Forgot your password?</h1>
        <h2 className="muted">Get recovery instructions in your email</h2>
      </div>

      <AuthSendResetPasswordTokenForm />

      <Separator />

      <Link className="button-text" href="/">
        Remembered your password?
      </Link>
    </Card>
  )
}
