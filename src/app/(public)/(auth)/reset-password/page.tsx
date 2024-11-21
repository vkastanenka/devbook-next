'use client'

// components
import { AuthResetPasswordCard } from '@/src/components/cards/auth/auth-reset-password-card'
import { Suspense } from 'react'

// utils
import { useRouter, useSearchParams } from 'next/navigation'

const ResetPassword = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  if (!token) {
    router.push('/')
    return null
  }

  return <AuthResetPasswordCard resetPasswordToken={token} />
}

const ResetPasswordPage = () => {
  return (
    <Suspense>
      <ResetPassword />
    </Suspense>
  )
}

export default ResetPasswordPage
