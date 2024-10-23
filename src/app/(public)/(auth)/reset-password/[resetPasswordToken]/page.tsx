'use client'

// components
import { ResetPasswordCard } from '@/components/cards/reset-password-card'

// utils
import { useRouter } from 'next/navigation'

interface ResetPasswordPageProps {
  params: {
    resetPasswordToken?: string
  }
}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ params }) => {
  const router = useRouter()

  if (!params.resetPasswordToken) {
    router.push('/')
    return null
  }

  return <ResetPasswordCard resetPasswordToken={params.resetPasswordToken} />
}

export default ResetPasswordPage
