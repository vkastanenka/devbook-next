// components
import Link from 'next/link'
import { Card } from '@/components/primitives/card'
import { Typography } from '@/components/ui/typography'
import { SendResetPasswordTokenForm } from '@/components/forms/send-reset-password-token-form'
import { Separator } from '@radix-ui/react-separator'

export const SendResetPasswordTokenCard = () => {
  return (
    <Card className="form-card">
      <div className="flex flex-col gap-2 items-center">
        <Typography.H3>Forgot your password?</Typography.H3>
        <Typography.Muted>
          Get recovery instructions in your email
        </Typography.Muted>
      </div>

      <SendResetPasswordTokenForm />

      <Separator className="separator" />

      <div className="text-center">
        <Link href="/">
          <Typography.P>Remembered your password?</Typography.P>
        </Link>
      </div>
    </Card>
  )
}
