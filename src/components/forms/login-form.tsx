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
import { login } from '@/lib/actions/auth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

// types
import { loginFormSchema, LoginFormData } from '@/src/lib/validation/auth'

// constants
import { STATUS_CODES } from '@/lib/constants'

export const LoginForm = () => {
  const email = 'vkastanenka@gmail.com'
  const password = 'password'

  const router = useRouter()
  const { toast } = useToast()

  const [responseErrors, setResponseErrors] = useState<{
    email?: string
    password?: string
  }>()

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
    const loginResponse = await login(formData)

    // If server error, show toast message
    if (loginResponse.status === STATUS_CODES.internalServerError) {
      toast({
        title: 'Error!',
        description: loginResponse.message,
        variant: 'destructive',
      })
    }

    // If bad request, show errors in corresponding fields
    if (loginResponse.status === STATUS_CODES.badRequest) {
      setResponseErrors(loginResponse.errors)
    }

    // If successful, push to user feed
    if (loginResponse.success) {
      router.push('/feed')
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
                  {responseErrors?.email}
                </Typography.Muted>
              )}
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
                  onChange={(e) => {
                    field.onChange(e)
                    if (responseErrors?.password) {
                      setResponseErrors((prevState) => ({
                        ...prevState,
                        password: '',
                      }))
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
              {responseErrors?.password && (
                <Typography.Muted className="text-destructive">
                  {responseErrors?.password}
                </Typography.Muted>
              )}
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
