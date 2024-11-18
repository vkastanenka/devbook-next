'use client'

// actions
import { userToggleContact } from '@/src/actions/user-actions'

// components
import { Button } from '@/src/components/ui/button'

// utils
import { useEffect, useState } from 'react'
import { useToast } from '@/src/hooks/use-toast'
import { useRouter } from 'next/navigation'

// types
import { User } from '@/src/types/user-types'

interface SearchToggleContactButton {
  user: User
  currentUser: User
}

export const SearchToggleContactButton: React.FC<SearchToggleContactButton> = ({
  user,
  currentUser,
}) => {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isContact, setIsContact] = useState<boolean>()

  useEffect(() => {
    const contactIdx = user?.contacts?.findIndex(
      (contact) => contact.id === currentUser?.id
    )
    if (typeof contactIdx === 'number' && contactIdx > -1) {
      setIsContact(true)
    }
  }, [currentUser?.id, user?.contacts])

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
      return
    }

    if (isContact) setIsContact(false)
    else setIsContact(true)

    router.refresh()

    toast({
      title: 'Success!',
      description: response.message,
    })
  }

  return (
    <Button disabled={isSubmitting} onClick={toggleContact}>
      {isContact ? 'Remove Contact' : 'Add Contact'}
    </Button>
  )
}
