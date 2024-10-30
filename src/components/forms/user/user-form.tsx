'use client'

// components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

// utils
import { useState } from 'react'
import { updateUser } from '@/actions/user-actions'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { useModal } from '@/hooks/use-modal-store'

// types
import { Address } from '@/types/'
import { User } from '@/types/user-types'
import {
  userFormSchema,
  UserFormData,
  UserFormReqBodySchema,
} from '@/validation/user'

export const UserForm: React.FC<{ className?: string; user: User }> = ({
  user,
}) => {
  const currentAddress = user.addresses?.length ? user.addresses[0] : null
  const router = useRouter()
  const { toast } = useToast()
  const { onClose } = useModal()

  const [responseErrors, setResponseErrors] = useState<{
    name?: string
    email?: string
    pronouns?: string
    headline?: string
    phone?: string
    website?: string
    unitNumber?: string
    streetNumber?: string
    streetName?: string
    suburbName?: string
    stateName?: string
    country?: string
  }>()

  const form = useForm({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      pronouns: user.pronouns || null,
      headline: user.headline || null,
      phone: user.phone || null,
      website: user.website || null,
      unitNumber: currentAddress?.unitNumber || null,
      streetNumber: currentAddress?.streetNumber || null,
      streetName: currentAddress?.streetName || null,
      suburbName: currentAddress?.suburbName || null,
      stateName: currentAddress?.stateName || null,
      country: currentAddress?.country || null,
      // image
      // resume
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const action: () => void = handleSubmit(async (formData: UserFormData) => {
    const reqBody = formatReqBody({ formData, currentAddress })
    const response = await updateUser(reqBody, user)

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

    // If successful, push to user feed
    if (response.success) {
      onClose()
      router.refresh()
      toast({
        title: 'Success!',
        description: response.message,
      })
    }
  })

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
              <FormLabel>Name*</FormLabel>
              <FormControl>
                <Input placeholder="Name*" disabled={isSubmitting} {...field} />
              </FormControl>
              <FormMessage />
              {responseErrors?.name && (
                <p className="muted text-destructive">{responseErrors.name}</p>
              )}
            </FormItem>
          )}
        />

        <FormField
          name="pronouns"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pronouns</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              {responseErrors?.pronouns && (
                <p className="muted text-destructive">
                  {responseErrors.pronouns}
                </p>
              )}
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
              {responseErrors?.headline && (
                <p className="muted text-destructive">
                  {responseErrors.headline}
                </p>
              )}
            </FormItem>
          )}
        />

        <Separator />

        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email*"
                  disabled={isSubmitting}
                  {...field}
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Phone" disabled={isSubmitting} {...field} />
              </FormControl>
              <FormMessage />
              {responseErrors?.phone && (
                <p className="muted text-destructive">{responseErrors.phone}</p>
              )}
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
              {responseErrors?.website && (
                <p className="muted text-destructive">
                  {responseErrors.website}
                </p>
              )}
            </FormItem>
          )}
        />

        <Separator />

        <FormField
          name="unitNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit number</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Unit number"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
              {responseErrors?.unitNumber && (
                <p className="muted text-destructive">
                  {responseErrors.unitNumber}
                </p>
              )}
            </FormItem>
          )}
        />

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
              {responseErrors?.streetNumber && (
                <p className="muted text-destructive">
                  {responseErrors.streetNumber}
                </p>
              )}
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
              {responseErrors?.streetName && (
                <p className="muted text-destructive">
                  {responseErrors.streetName}
                </p>
              )}
            </FormItem>
          )}
        />

        <FormField
          name="suburbName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="City" disabled={isSubmitting} {...field} />
              </FormControl>
              <FormMessage />
              {responseErrors?.suburbName && (
                <p className="muted text-destructive">
                  {responseErrors.suburbName}
                </p>
              )}
            </FormItem>
          )}
        />

        <FormField
          name="stateName"
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
              {responseErrors?.stateName && (
                <p className="muted text-destructive">
                  {responseErrors.stateName}
                </p>
              )}
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
              {responseErrors?.country && (
                <p className="muted text-destructive">
                  {responseErrors.country}
                </p>
              )}
            </FormItem>
          )}
        />

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
  formData: UserFormData
  currentAddress: Address | null
}): UserFormReqBodySchema => {
  const unitNumber = formData.unitNumber
  const streetNumber = formData.streetNumber
  const streetName = formData.streetName
  const suburbName = formData.suburbName
  const stateName = formData.stateName
  const country = formData.country

  const reqBodyAddress = {
    unitNumber,
    streetNumber,
    streetName,
    suburbName,
    stateName,
    country,
  }

  const hasAddressData = !!(
    unitNumber ||
    streetNumber ||
    streetName ||
    suburbName ||
    stateName ||
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
              : {}),
            create: [reqBodyAddress],
          },
        }
      : {}),
  }

  return reqBody
}
