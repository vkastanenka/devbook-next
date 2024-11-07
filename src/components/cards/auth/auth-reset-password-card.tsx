// components
import Link from 'next/link'
import { Card } from '@/src/components/ui/card'
import { Separator } from '@/src/components/ui/separator'

// forms
import { AuthResetPasswordForm } from '@/src/components/forms/auth/auth-reset-password-form'

interface ResetPasswordCard {
  resetPasswordToken: string
}

export const AuthResetPasswordCard: React.FC<ResetPasswordCard> = ({
  resetPasswordToken,
}) => {
  return (
    <Card className="card form-card">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="h3">Update your password</h1>
        <h2 className="muted">You can log in as normal afterwards</h2>
      </div>

      <AuthResetPasswordForm resetPasswordToken={resetPasswordToken} />

      <Separator />

      <div className="text-center">
        <Link href="/">
          <p className="p">Remembered your password?</p>
        </Link>
      </div>
    </Card>
  )
}
