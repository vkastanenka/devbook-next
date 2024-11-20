'use client'

// actions
import { authUpdatePassword } from '@/src/actions/auth-actions'

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
import {
  AuthUpdatePasswordFormData,
  AuthUpdatePasswordReqBody,
} from '@vkastanenka/devbook-types/dist/auth'

// validation
import { authUpdatePasswordReqBodySchema } from '@vkastanenka/devbook-validation/dist/auth'

export const AuthUpdatePasswordForm = () => {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(authUpdatePasswordReqBodySchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const action: () => void = handleSubmit(
    async (formData: AuthUpdatePasswordFormData) => {
      const response = await authUpdatePassword(
        formData as AuthUpdatePasswordReqBody
      )

      if (!response.success) {
        toast({
          title: 'Error!',
          description: response.message,
          variant: 'destructive',
        })
        return
      }

      router.push('/feed')
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
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Current password"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="newPassword"
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
