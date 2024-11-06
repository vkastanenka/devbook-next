'use client'

// actions
import { authResetPassword } from '@/actions/auth-actions'

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

// utils
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'

// types
import { AuthResetPasswordReqBody } from '@/types/auth-types'

// validation
import { authResetPasswordReqBodySchema } from '@/validation/auth-validation'

interface ResetPasswordForm {
  resetPasswordToken: string
}

export const AuthResetPasswordForm: React.FC<ResetPasswordForm> = ({
  resetPasswordToken,
}) => {
  const password = 'new-password'

  const router = useRouter()
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(authResetPasswordReqBodySchema),
    defaultValues: {
      password: password,
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const action: () => void = handleSubmit(
    async (formData: AuthResetPasswordReqBody) => {
      const response = await authResetPassword(resetPasswordToken, formData)

      // If other error, show toast message
      if (!response.success) {
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="New password"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isSubmitting}>
          <p className="h4">Update password</p>
        </Button>
      </form>
    </Form>
  )
}
