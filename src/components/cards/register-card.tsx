// components
import Link from 'next/link'
import { Card } from '@/components/primitives/card'
import { Typography } from '@/components/ui/typography'
import { RegisterForm } from '@/components/forms/register-form'
import { Separator } from '@radix-ui/react-separator'

export const RegisterCard = () => {
  return (
    <Card className="form-card">
      <div className="flex flex-col gap-2 items-center">
        <Typography.H3>Register a new account</Typography.H3>
        <Typography.Muted>{`It's quick and easy`}</Typography.Muted>
      </div>

      <RegisterForm />

      <Separator className="separator" />

      <div className="text-center">
        <Link href="/">
          <Typography.P>Already have an account?</Typography.P>
        </Link>
      </div>
    </Card>
  )
}