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
import { register } from '@/actions/auth-actions'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

// types
import { registerFormSchema, RegisterFormData } from '@/src/validation/auth'

export const AuthRegisterForm = () => {
  const name = 'Victoria Kastanenka'
  const username = 'vkastanenka'
  const email = 'vkastanenka@gmail.com'
  const password = 'password'

  const router = useRouter()
  const { toast } = useToast()

  const [responseErrors, setResponseErrors] = useState<{
    username?: string
    email?: string
  }>()

  const form = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name,
      username,
      email,
      password,
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const action: () => void = handleSubmit(
    async (formData: RegisterFormData) => {
      const response = await register(formData)

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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Name" disabled={isSubmitting} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Username"
                  disabled={isSubmitting}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    if (responseErrors?.username) {
                      setResponseErrors((prevState) => ({
                        ...prevState,
                        username: '',
                      }))
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
              {responseErrors?.username && (
                <Typography.Muted className="text-destructive">
                  {responseErrors.username}
                </Typography.Muted>
              )}
            </FormItem>
          )}
        />

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

        <FormField
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
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
          <Typography.H4>Register</Typography.H4>
        </Button>
      </form>
    </Form>
  )
}
