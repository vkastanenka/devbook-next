'use client'

// components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

// utils
import { login } from '@/lib/actions/auth'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  email: z.string().email().min(1, { message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
})

export const LoginModal = () => {
  const email = 'test@gmail.com'
  const password = 'password'

  const router = useRouter()
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
        await login(formData)
        router.refresh()
      } catch {
        toast({
          title: 'Error',
          description: 'Error reaching server',
        })
      }
    }
  )

  return (
    <Form {...form}>
      <form action={action}>
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="email"
                  disabled={isSubmitting}
                  className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
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
              <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                Password
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="password"
                  disabled={isSubmitting}
                  className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isSubmitting}>Login</Button>
      </form>
    </Form>
  )
}
