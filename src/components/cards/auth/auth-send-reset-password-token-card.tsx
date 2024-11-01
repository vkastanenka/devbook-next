// components
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { AuthSendResetPasswordTokenForm } from '@/components/forms/auth/auth-send-reset-password-token-form'
import { Separator } from '@radix-ui/react-separator'

export const AuthSendResetPasswordTokenCard = () => {
  return (
    <Card className="card form-card">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="h3">Forgot your password?</h1>
        <h2 className="muted">Get recovery instructions in your email</h2>
      </div>

      <AuthSendResetPasswordTokenForm />

      <Separator className="separator" />

      <div className="text-center">
        <Link href="/">
          <p className="p">Remembered your password?</p>
        </Link>
      </div>
    </Card>
  )
}
