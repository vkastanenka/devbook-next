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
  AddressCreateAddressFormData,
  AddressUpdateAddressFormData,
  AddressCreateUserAddressReqBody,
  AddressUpdateAddressReqBody,
} from '@vkastanenka/devbook-types/dist/address'
import { User } from '@vkastanenka/devbook-types/dist/user'

// validation
import {
  addressCreateAddressFormSchema,
  addressUpdateAddressFormSchema,
} from '@vkastanenka/devbook-validation/dist/address'

interface AddressForm {
  user?: User
}

export const AddressForm: React.FC<AddressForm> = ({ user }) => {
  const router = useRouter()
  const { toast } = useToast()
  const { onClose } = useModal()

  const form = useForm({
    resolver: zodResolver(
      user?.addresses && user.addresses.length > 0
        ? addressUpdateAddressFormSchema
        : addressCreateAddressFormSchema
    ),
    defaultValues: {
      unitNumber:
        (user?.addresses &&
          user.addresses.length > 0 &&
          user.addresses[0].unitNumber) ||
        '',
      streetNumber:
        (user?.addresses &&
          user.addresses.length > 0 &&
          user.addresses[0].streetNumber) ||
        '',
      streetName:
        (user?.addresses &&
          user.addresses.length > 0 &&
          user.addresses[0].streetName) ||
        '',
      suburb:
        (user?.addresses &&
          user.addresses.length > 0 &&
          user.addresses[0].suburb) ||
        '',
      state:
        (user?.addresses &&
          user.addresses.length > 0 &&
          user.addresses[0].state) ||
        '',
      country:
        (user?.addresses &&
          user.addresses.length > 0 &&
          user.addresses[0].country) ||
        '',
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
        } as AddressCreateUserAddressReqBody

        reqBody.unitNumber = reqBody.unitNumber || null

        response = await addressCreateCurrentUserAddress(reqBody)
      }

      if (!response?.data) {
        toast({
          title: 'Error!',
          description: response?.message,
          variant: 'destructive',
        })
        return
      }

      router.refresh()
      onClose()
    }
  )

  const updateAction: () => void = handleSubmit(
    async (formData: AddressUpdateAddressFormData) => {
      let response

      if (user?.addresses && user.addresses.length > 0) {
        const reqBody = formData as AddressUpdateAddressReqBody
        response = await addressUpdateCurrentUserAddress(
          user.addresses[0].id,
          reqBody
        )
      }

      if (!response?.data) {
        toast({
          title: 'Error!',
          description: response?.message,
          variant: 'destructive',
        })
        return
      }

      router.refresh()
      onClose()
    }
  )

  return (
    <Form {...form}>
      <form
        action={
          user?.addresses && user.addresses.length > 0
            ? updateAction
            : createAction
        }
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

        <Button className="h4" disabled={isSubmitting}>
          Update address
        </Button>
      </form>
    </Form>
  )
}
