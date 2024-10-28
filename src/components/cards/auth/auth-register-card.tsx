// components
import Link from 'next/link'
import { Card } from '@/components/primitives/card'
import { AuthRegisterForm } from '@/components/forms/auth/auth-register-form'
import { Separator } from '@radix-ui/react-separator'

export const AuthRegisterCard = () => {
  return (
    <Card className="form-card">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="h3">Register a new account</h1>
        <h2 className="muted">{`It's quick and easy`}</h2>
      </div>

      <AuthRegisterForm />

      <Separator className="separator" />

      <div className="text-center">
        <Link href="/">
          <p className="p">Already have an account?</p>
        </Link>
      </div>
    </Card>
  )
}
