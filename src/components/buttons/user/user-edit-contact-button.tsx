'use client'

// svg
import { UserPlus, UserMinus } from 'lucide-react'

// utils
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
// import { updateUser } from '@/src/actions-old/user-actions'

// types
import { User } from '@/types/user-types'

interface UserEditContactButton {
  currentUser: User
  isContact?: boolean
  user: User
}

export const UserEditContactButton: React.FC<UserEditContactButton> = ({
  currentUser,
  isContact,
  user,
}) => {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  // const editContact = async () => {
  //   setIsSubmitting(true)

  //   const currentUserReqBody = {
  //     contacts: {
  //       [isContact ? 'disconnect' : 'connect']: [
  //         {
  //           id: user.id,
  //         },
  //       ],
  //     },
  //   }

  //   const userReqBody = {
  //     contacts: {
  //       [isContact ? 'disconnect' : 'connect']: [
  //         {
  //           id: currentUser.id,
  //         },
  //       ],
  //     },
  //   }

  //   const currentUserResponse = await updateUser(
  //     currentUserReqBody,
  //     currentUser
  //   )
  //   const userResponse = await updateUser(userReqBody, user)

  //   setIsSubmitting(false)

  //   // If other error, show toast message
  //   if (!currentUserResponse.success) {
  //     toast({
  //       title: 'Error!',
  //       description: currentUserResponse.message,
  //       variant: 'destructive',
  //     })
  //   }

  //   if (!userResponse.success) {
  //     toast({
  //       title: 'Error!',
  //       description: userResponse.message,
  //       variant: 'destructive',
  //     })
  //   }

  //   // If successful, push to user feed
  //   if (currentUserResponse.success && userResponse.success) {
  //     router.refresh()
  //     toast({
  //       title: 'Success!',
  //       description: currentUserResponse.message,
  //     })
  //   }
  // }

  return (
    <button
      disabled={isSubmitting}
      className="absolute top-4 right-4"
      // onClick={editContact}
    >
      {isContact ? <UserMinus /> : <UserPlus />}
    </button>
  )
}
