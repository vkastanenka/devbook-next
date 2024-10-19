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
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Typography } from '../ui/typography'

const formSchema = z.object({
  email: z.string().email(),
})

export const RecoverPasswordModal = () => {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const action: () => void = handleSubmit(
    async (formData: z.infer<typeof formSchema>) => {
      try {
        console.log(formData)
        // await login(formData)
        router.push('/feed')
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
          <Typography.H3>Forgot your password?</Typography.H3>
          <Typography.Muted>Get recovery instructions in your email</Typography.Muted>
        </div>
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

            <Button disabled={isSubmitting}>
              <Typography.H4>Send recovery email</Typography.H4>
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <Link href="/">
            <Typography.P>Remembered your password?</Typography.P>
          </Link>
        </div>
      </Card>
    </div>
  )
}
