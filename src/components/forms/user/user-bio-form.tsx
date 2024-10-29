'use client'

// components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

// utils
import { useState } from 'react'
import { updateUser } from '@/actions/user-actions'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { useModal } from '@/hooks/use-modal-store'

// types
import { User } from '@/types/user-types'
import { bioFormSchema, BioFormData } from '@/validation/user'

export const UserBioForm: React.FC<{ user: User }> = ({ user }) => {
  const router = useRouter()
  const { toast } = useToast()
  const { onClose } = useModal()

  const [responseErrors, setResponseErrors] = useState<{
    bio?: string
  }>()

  const form = useForm({
    resolver: zodResolver(bioFormSchema),
    defaultValues: {
      bio: user.bio || '',
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const action: () => void = handleSubmit(async (formData: BioFormData) => {
    const response = await updateUser(formData, user)

    // If form errors, show errors in corresponding field
    if (!response.success && response.errors) {
      setResponseErrors(response.errors)
    }

    // If other error, show toast message
    if (!response.success && !response.errors) {
      toast({
        title: 'Error!',
        description: response.message,
        variant: 'destructive',
      })
    }

    // If successful, push to user feed
    if (response.success) {
      onClose()
      router.refresh()
      toast({
        title: 'Success!',
        description: response.message,
      })
    }
  })

  return (
    <Form {...form}>
      <form
        action={action}
        autoComplete="off"
        className="flex flex-col gap-4 justify-center"
      >
        <FormField
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  rows={10}
                  placeholder="Bio"
                  disabled={isSubmitting}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    if (responseErrors?.bio) {
                      setResponseErrors((prevState) => ({
                        ...prevState,
                        bio: '',
                      }))
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
              {responseErrors?.bio && (
                <p className="muted text-destructive">{responseErrors.bio}</p>
              )}
            </FormItem>
          )}
        />

        <Button disabled={isSubmitting}>
          <p className="h4">Update bio</p>
        </Button>
      </form>
    </Form>
  )
}
