// components
import Link from 'next/link'
import { Card } from '@/components/primitives/card'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { LoginForm } from '@/components/forms/login-form'
import { Separator } from '@radix-ui/react-separator'

export const LoginCard = () => {
  return (
    <Card>
      <LoginForm />
      <div className="text-center mt-4 [&>:not(:last-child)]:mb-4">
        <Link href="/recover-password" className="inline-block">
          <Typography.P>Forgot password?</Typography.P>
        </Link>

        <Separator className="separator" />

        <Link href="/register" className="py-2">
          <Button tabIndex={-1}>
            <Typography.P>Create new account</Typography.P>
          </Button>
        </Link>
      </div>
    </Card>
  )
}
