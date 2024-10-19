'use client'

// components
import { ResetPasswordModal } from '@/components/modals/reset-password-modal'

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

  return <ResetPasswordModal resetPasswordToken={params.resetPasswordToken} />
}

export default ResetPasswordPage
