// components
import Link from 'next/link'
import { Card } from '@/components/primitives/card'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { LoginForm } from '@/components/forms/login-form'
import { Separator } from '@radix-ui/react-separator'

export const LoginCard = () => {
  return (
    <Card className="form-card">
      <LoginForm />

      <div className="text-center">
        <Link href="/recover-password">
          <Typography.P>Forgot password?</Typography.P>
        </Link>
      </div>

      <Separator className="separator" />

      <div className="text-center">
        <Link href="/register">
          <Button tabIndex={-1}>
            <Typography.P>Create new account</Typography.P>
          </Button>
        </Link>
      </div>
    </Card>
  )
}
