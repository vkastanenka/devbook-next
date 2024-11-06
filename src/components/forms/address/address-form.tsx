'use client'

// actions
import {
  addressCreateCurrentUserAddress,
  addressUpdateCurrentUserAddress,
} from '@/src/actions/address-actions'

// components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form'
import { Input } from '@/src/components/ui/input'
import { Button } from '@/src/components/ui/button'

// utils
import { useForm } from 'react-hook-form'
import { useModal } from '@/src/hooks/use-modal-store'
import { useRouter } from 'next/navigation'
import { useToast } from '@/src/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'

// types
import {
  Address,
  AddressCreateAddressFormData,
  AddressUpdateAddressFormData,
  AddressCreateCurrentUserAddressReqBody,
  AddressUpdateAddressReqBody,
} from '@/src/types/address-types'
import { User } from '@/src/types/user-types'

// validation
import {
  addressCreateAddressFormSchema,
  addressUpdateAddressFormSchema,
} from '@/src/validation/address-validation'

interface AddressForm {
  address?: Address
  user?: User
}

export const AddressForm: React.FC<AddressForm> = ({ address, user }) => {
  const router = useRouter()
  const { toast } = useToast()
  const { onClose } = useModal()

  const form = useForm({
    resolver: zodResolver(
      address ? addressUpdateAddressFormSchema : addressCreateAddressFormSchema
    ),
    defaultValues: {
      unitNumber: address?.unitNumber || undefined,
      streetNumber: address?.streetNumber || '',
      streetName: address?.streetName || '',
      suburb: address?.suburb || '',
      state: address?.state || '',
      country: address?.country || '',
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const createAction: () => void = handleSubmit(
    async (formData: AddressCreateAddressFormData) => {
      let response

      if (user) {
        const reqBody = {
          ...formData,
          userId: user.id,
        } as AddressCreateCurrentUserAddressReqBody

        response = await addressCreateCurrentUserAddress(reqBody)
      }

      if (response && !response.success && !response.errors) {
        toast({
          title: 'Error!',
          description: response.message,
          variant: 'destructive',
        })
      }

      // If successful, push to user feed
      if (response && response.success) {
        onClose()
        router.refresh()
        toast({
          title: 'Success!',
          description: response.message,
        })
      }
    }
  )

  const updateAction: () => void = handleSubmit(
    async (formData: AddressUpdateAddressFormData) => {
      let response

      if (address) {
        const reqBody = formData as AddressUpdateAddressReqBody
        response = await addressUpdateCurrentUserAddress(address.id, reqBody)
      }

      if (response && !response.success && !response.errors) {
        toast({
          title: 'Error!',
          description: response.message,
          variant: 'destructive',
        })
      }

      // If successful, push to user feed
      if (response && response.success) {
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
        action={address ? updateAction : createAction}
        autoComplete="off"
        className="flex flex-col gap-4 justify-center"
      >
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
                <Input placeholder="City" disabled={isSubmitting} {...field} />
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
        <Button disabled={isSubmitting}>
          <p className="h4">Update bio</p>
        </Button>
      </form>
    </Form>
  )
}
