'use client'

// actions
import { userToggleContact } from '@/src/actions/user-actions'

// svg
import { UserPlus, UserMinus } from 'lucide-react'

// utils
import { useState } from 'react'
import { useToast } from '@/src/hooks/use-toast'
import { useRouter } from 'next/navigation'

// types
import { User } from '@/src/types/user-types'

interface UserEditContactButton {
  isContact?: boolean
  user: User
}

export const UserEditContactButton: React.FC<UserEditContactButton> = ({
  isContact,
  user,
}) => {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const editContact = async () => {
    setIsSubmitting(true)

    const response = await userToggleContact(user.id)

    setIsSubmitting(false)

    if (!response.success) {
      toast({
        title: 'Error!',
        description: response.message,
        variant: 'destructive',
      })
    }

    router.refresh()

    toast({
      title: 'Success!',
      description: response.message,
    })
  }

  return (
    <button
      disabled={isSubmitting}
      className="button-text absolute top-4 right-4"
      onClick={editContact}
    >
      {isContact ? <UserMinus /> : <UserPlus />}
    </button>
  )
}
