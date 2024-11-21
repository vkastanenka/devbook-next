'use client'

// actions
import { userUpdateCurrentUser } from '@/src/actions/user-actions'

// components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select'
import { ModalFormScrollArea } from '@/src/components/ui/modal-form-scroll-area'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Separator } from '@/src/components/ui/separator'
import { Textarea } from '@/src/components/ui/textarea'

// utils
import { useForm } from 'react-hook-form'
import { useModal } from '@/src/hooks/use-modal-store'
import { useRouter } from 'next/navigation'
import { useToast } from '@/src/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'

// types
import {
  User,
  UserUpdateDetailsFormData,
  UserUpdateUserReqBody,
} from '@vkastanenka/devbook-types/dist/user'

// validation
import { userUpdateDetailsFormSchema } from '@vkastanenka/devbook-validation/dist/user'

interface UserDetailsForm {
  user: User
}

export const UserDetailsForm: React.FC<UserDetailsForm> = ({ user }) => {
  const router = useRouter()
  const { toast } = useToast()
  const { onClose } = useModal()

  const form = useForm({
    resolver: zodResolver(userUpdateDetailsFormSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      pronouns: user.pronouns || '',
      headline: user.headline || '',
      phone: user.phone || '',
      website: user.website || '',
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const action: () => void = handleSubmit(
    async (formData: UserUpdateDetailsFormData) => {
      const reqBody = formData as UserUpdateUserReqBody

      if (!reqBody.name) delete reqBody.name
      if (!reqBody.email) delete reqBody.email
      reqBody.pronouns = reqBody.pronouns || null
      reqBody.headline = reqBody.headline || null
      reqBody.phone = reqBody.phone || null
      reqBody.website = reqBody.website || null

      const response = await userUpdateCurrentUser(user.id, reqBody)

      if (!response.data) {
        toast({
          title: 'Error!',
          description: response.message,
          variant: 'destructive',
        })
      }

      onClose()
      router.refresh()
    }
  )

  return (
    <Form {...form}>
      <form
        action={action}
        autoComplete="off"
        className="flex flex-col gap-4 justify-center"
      >
        <ModalFormScrollArea>
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
        </ModalFormScrollArea>

        <Button className="h4" disabled={isSubmitting}>
          Update User
        </Button>
      </form>
    </Form>
  )
}
