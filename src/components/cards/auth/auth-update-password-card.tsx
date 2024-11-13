// components
import { Card } from '@/src/components/ui/card'

// forms
import { AuthUpdatePasswordForm } from '@/src/components/forms/auth/auth-update-password-form'

export const AuthUpdatePasswordCard = () => {
  return (
    <Card className="card form-card">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="h3">Update your password</h1>
        <h2 className="muted">Keep yourself secure</h2>
      </div>

      <AuthUpdatePasswordForm />
    </Card>
  )
}
