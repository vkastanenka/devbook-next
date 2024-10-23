'use client'

// components
import { ResetPasswordCard } from '@/components/cards/reset-password-card'

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

  return <ResetPasswordCard resetPasswordToken={token} />
}

export default ResetPasswordPage
