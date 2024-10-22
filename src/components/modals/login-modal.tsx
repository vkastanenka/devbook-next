'use client'

// components
import { Card } from '@/components/primitives/card'
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
import Link from 'next/link'
import { Typography } from '../ui/typography'
import { Separator } from '@radix-ui/react-separator'

// types
import { loginFormSchema, LoginFormData } from '@/src/lib/validation/auth'

export const LoginModal = () => {
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
      toast({
        title: 'Error',
        description: 'Error reaching server',
      })
    }
  })

  return (
    <div className="w-[400px]">
      <Card>
        <Form {...form}>
          <form action={action} className="flex flex-col gap-4 justify-center">
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      disabled={isSubmitting}
                      {...field}
                    />
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
        <div className="text-center mt-4">
          <Link href="/recover-password" className="inline-block mb-4">
            <Typography.P>Forgot password?</Typography.P>
          </Link>

          <Separator className="mb-4" />

          <Link href="/register">
            <Button>
              <Typography.P>Create new account</Typography.P>
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
