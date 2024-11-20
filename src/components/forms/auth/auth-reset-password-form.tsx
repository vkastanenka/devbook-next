'use client'

// actions
import { authResetPassword } from '@/src/actions/auth-actions'

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
import { useToast } from '@/src/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'

// types
import { AuthResetPasswordReqBody } from '@vkastanenka/devbook-types/dist/auth'

// validation
import { authResetPasswordReqBodySchema } from '@vkastanenka/devbook-validation/dist/auth'

interface ResetPasswordForm {
  resetPasswordToken: string
}

export const AuthResetPasswordForm: React.FC<ResetPasswordForm> = ({
  resetPasswordToken,
}) => {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(authResetPasswordReqBodySchema),
    defaultValues: {
      password: '',
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const action: () => void = handleSubmit(
    async (formData: AuthResetPasswordReqBody) => {
      const response = await authResetPassword(resetPasswordToken, formData)

      if (!response.success) {
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

        <Button className="h4" disabled={isSubmitting}>
          Update password
        </Button>
      </form>
    </Form>
  )
}
