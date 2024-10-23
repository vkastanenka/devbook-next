// components
import Link from 'next/link'
import { Card } from '@/components/primitives/card'
import { Typography } from '@/components/ui/typography'
import { ResetPasswordForm } from '@/components/forms/reset-password-form'
import { Separator } from '@radix-ui/react-separator'

interface ResetPasswordCard {
  resetPasswordToken: string
}

export const ResetPasswordCard: React.FC<ResetPasswordCard> = ({
  resetPasswordToken,
}) => {
  return (
    <Card className="form-card">
      <div className="flex flex-col gap-2 items-center">
        <Typography.H3>Update your password</Typography.H3>
        <Typography.Muted>You can log in as normal afterwards</Typography.Muted>
      </div>

      <ResetPasswordForm resetPasswordToken={resetPasswordToken} />

      <Separator className="separator" />

      <div className="text-center">
        <Link href="/">
          <Typography.P>Remembered your password?</Typography.P>
        </Link>
      </div>
    </Card>
  )
}
