// components
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { AuthResetPasswordForm } from '@/components/forms/auth/auth-reset-password-form'
import { Separator } from '@radix-ui/react-separator'

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

      <Separator className="separator" />

      <div className="text-center">
        <Link href="/">
          <p className="p">Remembered your password?</p>
        </Link>
      </div>
    </Card>
  )
}
