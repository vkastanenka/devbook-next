// components
import Link from 'next/link'
import { Card } from '@/src/components/ui/card'
import { Separator } from '@/src/components/ui/separator'

// forms
import { AuthRegisterForm } from '@/components/forms/auth/auth-register-form'

export const AuthRegisterCard = () => {
  return (
    <Card className="card form-card">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="h3">Register a new account</h1>
        <h2 className="muted">{`It's quick and easy`}</h2>
      </div>

      <AuthRegisterForm />

      <Separator />

      <div className="text-center">
        <Link href="/">
          <p className="p">Already have an account?</p>
        </Link>
      </div>
    </Card>
  )
}
