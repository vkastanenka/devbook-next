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
import { register } from '@/src/lib/actions/auth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

// types
import { registerFormSchema, RegisterFormData } from '@/src/lib/validation/auth'

// constants
import { STATUS_CODES } from '@/lib/constants'

export const RegisterModal = () => {
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

      // If server error, show toast message
      if (response.status === STATUS_CODES.internalServerError) {
        toast({
          title: 'Error!',
          description: response.message,
          variant: 'destructive',
        })
      }

      // If bad request, show errors in corresponding fields
      if (response.status === STATUS_CODES.badRequest) {
        setResponseErrors(response.errors)
      }

      // If successful, push to user feed
      if (response.success) {
        router.push('/')
      }
    }
  )

  return (
    <Form {...form}>
      <form action={action} className="flex flex-col gap-4 justify-center">
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
          <Typography.H4>Register</Typography.H4>
        </Button>
      </form>
    </Form>
  )
}
