'use client'

// components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

// utils
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { sendResetPasswordToken } from '@/src/lib/actions/auth'

// types
import {
  sendResetPasswordTokenFormSchema,
  SendResetPasswordTokenFormData,
} from '@/src/lib/validation/auth'

export const SendResetPasswordTokenForm = () => {
  const email = 'vkastanenka@gmail.com'

  const router = useRouter()
  const { toast } = useToast()

  const [responseErrors, setResponseErrors] = useState<{
    email?: string
  }>()

  const form = useForm({
    resolver: zodResolver(sendResetPasswordTokenFormSchema),
    defaultValues: {
      email: email,
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const action: () => void = handleSubmit(
    async (formData: SendResetPasswordTokenFormData) => {
      const response = await sendResetPasswordToken(formData)

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

      // If successful, push to home page
      if (response.success) {
        toast({
          title: 'Success!',
          description: response.message,
        })
        router.push('/')
      }
    }
  )

  return (
    <Form {...form}>
      <form
        action={action}
        autoComplete="off"
        className="flex flex-col gap-4 justify-center"
      >
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Email"
                  disabled={isSubmitting}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    if (responseErrors?.email) {
                      setResponseErrors((prevState) => ({
                        ...prevState,
                        email: '',
                      }))
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
              {responseErrors?.email && (
                <Typography.Muted className="text-destructive">
                  {responseErrors.email}
                </Typography.Muted>
              )}
            </FormItem>
          )}
        />

        <Button disabled={isSubmitting}>
          <Typography.H4>Send recovery email</Typography.H4>
        </Button>
      </form>
    </Form>
  )
}
