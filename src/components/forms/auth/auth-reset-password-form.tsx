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
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { resetPassword } from '@/actions/auth-actions'

// types
import {
  resetPasswordFormSchema,
  ResetPasswordFormData,
} from '@/src/validation/auth'

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
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: password,
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const action: () => void = handleSubmit(
    async (formData: ResetPasswordFormData) => {
      const response = await resetPassword(formData, resetPasswordToken)

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
          <Typography.H4>Update password</Typography.H4>
        </Button>
      </form>
    </Form>
  )
}
