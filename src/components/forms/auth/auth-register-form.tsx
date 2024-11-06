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
import { useState } from 'react'
import { authRegister } from '@/actions/auth-actions'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

// types
import { AuthRegisterReqBody } from '@/types/auth-types'

// validation
import { authRegisterReqBodySchema } from '@/validation/auth-validation'

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
    resolver: zodResolver(authRegisterReqBodySchema),
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
    async (formData: AuthRegisterReqBody) => {
      const response = await authRegister(formData)

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
                <p className="muted text-destructive">
                  {responseErrors.username}
                </p>
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
                <p className="muted text-destructive">{responseErrors.email}</p>
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
          <p className="h4">Register</p>
        </Button>
      </form>
    </Form>
  )
}
