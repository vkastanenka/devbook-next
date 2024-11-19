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
  user: User
  currentUser: User
}

export const UserEditContactButton: React.FC<UserEditContactButton> = ({
  user,
  currentUser,
}) => {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  let isContact
  user?.contacts?.every((contact) => {
    if (contact.id === currentUser.id) {
      isContact = true
      return false
    }
    return true
  })

  const toggleContact = async () => {
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
  }

  return (
    <button
      disabled={isSubmitting}
      className="button-text absolute top-4 right-4"
      onClick={toggleContact}
    >
      {isContact ? <UserMinus /> : <UserPlus />}
    </button>
  )
}
