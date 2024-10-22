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

// utils
import { login } from '@/lib/actions/auth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { Typography } from '../ui/typography'

// types
import { loginFormSchema, LoginFormData } from '@/src/lib/validation/auth'

export const LoginForm = () => {
  const email = 'vkastanenka@gmail.com'
  const password = 'password'

  const router = useRouter()
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: email,
      password: password,
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const action: () => void = handleSubmit(async (formData: LoginFormData) => {
    try {
      await login(formData)
      router.push('/feed')
    } catch {
      // Why doesn't it work?
      toast({
        title: 'Error',
        description: 'Error reaching server',
      })
    }
  })

  return (
    <Form {...form}>
      <form action={action} className="flex flex-col gap-4 justify-center">
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" disabled={isSubmitting} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Password"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isSubmitting}>
          <Typography.H4>Log In</Typography.H4>
        </Button>
      </form>
    </Form>
  )
}
