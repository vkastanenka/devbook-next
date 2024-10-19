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
import { register } from '@/src/lib/actions/auth'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Typography } from '../ui/typography'

const formSchema = z.object({
  name: z.string().refine((s) => {
    const names = s.split(' ')
    if (names.length === 2) return true
  }, 'First and last names are required.'),
  username: z
    .string()
    .min(4, { message: 'Username must contain at least 4 character(s)' }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must contain at least 8 character(s)' }),
})

export const RegisterModal = () => {
  const name = 'Victoria Kastanenka'
  const username = 'vkastanenka'
  const email = 'vkastanenka@gmail.com'
  const password = 'password'

  const router = useRouter()
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(formSchema),
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
    async (formData: z.infer<typeof formSchema>) => {
      try {
        await register(formData)
        router.push('/')
      } catch {
        toast({
          title: 'Error',
          description: 'Error reaching server',
        })
      }
    }
  )

  return (
    <div className="w-[400px]">
      <Card>
        <div className="mb-4 flex flex-col gap-2 items-center">
          <Typography.H3>Register a new account</Typography.H3>
          <Typography.Muted>{`It's quick and easy`}</Typography.Muted>
        </div>
        <Form {...form}>
          <form action={action} className="flex flex-col gap-4 justify-center">
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Name"
                      disabled={isSubmitting}
                      {...field}
                    />
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
        <div className="text-center mt-4">
          <Link href="/">
            <Typography.P>Already have an account?</Typography.P>
          </Link>
        </div>
      </Card>
    </div>
  )
}
