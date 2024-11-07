'use client'

// components
import { AuthResetPasswordCard } from '@/src/components/cards/auth/auth-reset-password-card'

// utils
import { useRouter, useSearchParams } from 'next/navigation'

const ResetPasswordPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  if (!token) {
    router.push('/')
    return null
  }

  return <AuthResetPasswordCard resetPasswordToken={token} />
}

export default ResetPasswordPage
