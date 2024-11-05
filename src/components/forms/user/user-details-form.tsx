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
import { updateUser } from '@/src/actions-old/user-actions'
import { useForm } from 'react-hook-form'
import { useModal } from '@/hooks/use-modal-store'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'

// types
import { Address } from '@/types/'
import {
  User,
  UserDetailsFormData,
  UserDetailsReqBody,
} from '@/types/user-types'
import { userDetailsFormSchema } from '@/validation/user'

/**
 * TODO
 *
 * Handle image and resume
 * Remove unit number from address
 * Response errors
 */

export const UserDetailsForm: React.FC<{ user: User }> = ({ user }) => {
  const router = useRouter()
  const { toast } = useToast()
  const { onClose } = useModal()

  const currentAddress =
    user.addresses && user.addresses?.length ? user.addresses[0] : null

  const form = useForm({
    resolver: zodResolver(userDetailsFormSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      pronouns: user.pronouns,
      headline: user.headline,
      phone: user.phone,
      website: user.website,
      streetNumber: currentAddress?.streetNumber,
      streetName: currentAddress?.streetName,
      suburb: currentAddress?.suburb,
      state: currentAddress?.state,
      country: currentAddress?.country,
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const action: () => void = handleSubmit(
    async (formData: UserDetailsFormData) => {
      const reqBody = formatReqBody({ formData, currentAddress })
      const response = await updateUser(reqBody, user)

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

          <Separator />

          <p className="h4">Address</p>

          <FormField
            name="streetNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street number</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Street number"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="streetName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Street name"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="suburb"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    placeholder="City"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State/Province</FormLabel>
                <FormControl>
                  <Input
                    placeholder="State/Province"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Country"
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

const formatReqBody = ({
  formData,
  currentAddress,
}: {
  formData: UserDetailsFormData
  currentAddress: Address | null
}): UserDetailsReqBody => {
  const streetNumber = formData.streetNumber
  const streetName = formData.streetName
  const suburb = formData.suburb
  const state = formData.state
  const country = formData.country

  const reqBodyAddress = {
    streetNumber,
    streetName,
    suburb,
    state,
    country,
  }

  const hasAddressData = !!(
    streetNumber &&
    streetName &&
    suburb &&
    state &&
    country
  )

  const reqBody = {
    name: formData.name,
    email: formData.email,
    pronouns: formData.pronouns,
    headline: formData.headline,
    phone: formData.phone,
    website: formData.website,
    ...(hasAddressData
      ? {
          addresses: {
            ...(currentAddress
              ? {
                  update: {
                    where: {
                      id: currentAddress.id,
                    },
                    data: reqBodyAddress,
                  },
                }
              : { create: [reqBodyAddress] }),
          },
        }
      : {}),
  }

  return reqBody
}
