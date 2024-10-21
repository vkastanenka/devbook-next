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
import { Typography } from '@/components/ui/typography'

// utils
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { sendResetPasswordToken } from '@/src/lib/actions/auth'

const formSchema = z.object({
  email: z.string().email(),
})

export const ResetPasswordModal: React.FC = () => {
  const email = 'vkastanenka@gmail.com'

  const router = useRouter()
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email,
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const action: () => void = handleSubmit(
    async (formData: z.infer<typeof formSchema>) => {
      try {
        await sendResetPasswordToken(formData)
        router.push('/')
      } catch {
        toast({
          title: 'Error!',
          description: 'Error reaching server!',
        })
      }
    }
  )

  return (
    <div className="w-[400px]">
      <Card>
        <div className="mb-4 flex flex-col gap-2 items-center">
          <Typography.H3>Update your password</Typography.H3>
          <Typography.Muted>
            You can log in as normal afterwards
          </Typography.Muted>
        </div>
        <Form {...form}>
          <form action={action} className="flex flex-col gap-4 justify-center">
            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="New password"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isSubmitting}>
              <Typography.H4>Update password</Typography.H4>
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  )
}
