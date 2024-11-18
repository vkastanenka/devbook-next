'use client'

// actions
import { authSendResetPasswordToken } from '@/src/actions/auth-actions'

// components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/src/components/ui/form'
import { Input } from '@/src/components/ui/input'
import { Button } from '@/src/components/ui/button'

// utils
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useToast } from '@/src/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'

// types
import { AuthSendResetPasswordTokenReqBody } from '@/src/types/auth-types'

// validation
import { authSendResetPasswordTokenReqBodySchema } from '@/src/validation/auth-validation'

export const AuthSendResetPasswordTokenForm = () => {
  const router = useRouter()
  const { toast } = useToast()

  const [responseErrors, setResponseErrors] = useState<{
    email?: string
  }>()

  const form = useForm({
    resolver: zodResolver(authSendResetPasswordTokenReqBodySchema),
    defaultValues: {
      email: '',
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const action: () => void = handleSubmit(
    async (formData: AuthSendResetPasswordTokenReqBody) => {
      const response = await authSendResetPasswordToken(formData)

      if (!response.success && response.errors) {
        setResponseErrors(response.errors)
        return
      }

      if (!response.success && !response.errors) {
        toast({
          title: 'Error!',
          description: response.message,
          variant: 'destructive',
        })
        return
      }

      router.push('/')
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
                <p className="muted text-destructive">{responseErrors.email}</p>
              )}
            </FormItem>
          )}
        />

        <Button className="h4" disabled={isSubmitting}>
          Send recovery email
        </Button>
      </form>
    </Form>
  )
}
