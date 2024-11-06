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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'

// utils
import { userUpdateCurrentUser } from '@/src/actions/user-actions'
import { useForm } from 'react-hook-form'
import { useModal } from '@/src/hooks/use-modal-store'
import { useRouter } from 'next/navigation'
import { useToast } from '@/src/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'

// types
import { User } from '@/src/types/user-types'
import {
  UserDetailsFormData,
  UserUpdateUserReqBody,
} from '@/src/types/user-types'

// validation
import { userDetailsFormSchema } from '@/src/validation/user-validation'

interface UserDetailsForm {
  user: User
}

export const UserDetailsForm: React.FC<UserDetailsForm> = ({ user }) => {
  const router = useRouter()
  const { toast } = useToast()
  const { onClose } = useModal()

  const form = useForm({
    resolver: zodResolver(userDetailsFormSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      pronouns: user.pronouns,
      headline: user.headline,
      phone: user.phone,
      website: user.website,
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const action: () => void = handleSubmit(
    async (formData: UserDetailsFormData) => {
      const response = await userUpdateCurrentUser(
        user.id,
        formData as UserUpdateUserReqBody
      )

      // If other error, show toast message
      if (!response.success && !response.errors) {
        toast({
          title: 'Error!',
          description: response.message,
          variant: 'destructive',
        })
      }

      // If successful, push to user feed
      if (response.success) {
        onClose()
        router.refresh()
        toast({
          title: 'Success!',
          description: response.message,
        })
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
        <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-4">
          <p className="h4">Identity</p>

          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Name*"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="pronouns"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pronouns</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pronouns" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="he/him">{'he/him'}</SelectItem>
                    <SelectItem value="she/her">{'she/her'}</SelectItem>
                    <SelectItem value="they/them">{'they/them'}</SelectItem>
                    <SelectItem value="other">{'other'}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="headline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Headline</FormLabel>
                <FormControl>
                  <Textarea
                    rows={4}
                    placeholder="Headline"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator />

          <p className="h4">Contact</p>

          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email*"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Phone"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Website"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button disabled={isSubmitting}>
          <p className="h4">Update user</p>
        </Button>
      </form>
    </Form>
  )
}
