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
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

// svg
import { X } from 'lucide-react'

// utils
import { useState } from 'react'
import { updateUser } from '@/actions/user-actions'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { useModal } from '@/hooks/use-modal-store'

// types
import { User } from '@/types/user-types'
import {
  userEducationsFormSchema,
  UserEducationsFormData,
  UserEducationData,
  UserEducationsFormReqBodyData,
  UserEducationsFormReqBodyDataUpdates,
} from '@/validation/user'

export const UserEducationsForm: React.FC<{ user: User }> = ({ user }) => {
  const router = useRouter()
  const { toast } = useToast()
  const { onClose } = useModal()

  const [renderedFormValues, setRenderedFormValues] = useState<
    UserEducationData[]
  >((user.userEducations as UserEducationData[]) || [])

  const form = useForm({
    resolver: zodResolver(userEducationsFormSchema),
    defaultValues: {
      userEducations: (user.userEducations as UserEducationData[]) || [],
    },
  })

  const {
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const action: () => void = handleSubmit(
    async (formData: UserEducationsFormData) => {
      let createsResponse
      const formattedReqBody = formatRequestBodies({ formData })

      if (formattedReqBody.creates) {
        console.log(formattedReqBody.creates)
        await updateUser(formattedReqBody.creates, user)
      }

      if (formattedReqBody.updates) {
        await Promise.all(
          formattedReqBody.updates.map(async (update) => {
            const response = await updateUser(update, user)
            return response
          })
        )
      }

      // if (formattedReqBody.updates?.length) {
      //   await Promise.all(
      //     formattedReqBody.updates.map(async (update) => {
      //       await updateUser(update, user)
      //     })
      //   )
      // }
      // const response = await updateUser(formattedReqBody, user)

      // // If other error, show toast message
      // if (!response.success && !response.errors) {
      //   toast({
      //     title: 'Error!',
      //     description: response.message,
      //     variant: 'destructive',
      //   })
      // }

      // // If successful, push to user feed
      // if (response.success) {
      //   onClose()
      //   router.refresh()
      //   toast({
      //     title: 'Success!',
      //     description: response.message,
      //   })
      // }
    }
  )

  return (
    <Form {...form}>
      <form
        action={action}
        autoComplete="off"
        className="flex flex-col gap-4 justify-center"
      >
        {/* {!renderedFormValues?.length && (
          <FormField
            name={`skills.0`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Skill"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )} */}
        {renderedFormValues.length &&
          renderedFormValues.map((_, i, arr) => {
            return (
              <div key={i} className="relative flex flex-col gap-4">
                <FormField
                  name={`userEducations.${i}.school`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>School</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="School"
                          disabled={isSubmitting}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name={`userEducations.${i}.degree`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Degree</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Degree"
                          disabled={isSubmitting}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name={`userEducations.${i}.startYear`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start year</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Start year"
                          disabled={isSubmitting}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name={`userEducations.${i}.endYear`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End year</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="End year"
                          disabled={isSubmitting}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {i !== arr.length - 1 && <Separator />}
                {/* <button
                  onClick={(e) => {
                    e.preventDefault()
                    const formValues = getValues()
                    const filteredRepos = formValues.skills.filter(
                      (_, j) => !(i === j)
                    )
                    setValue('skills', filteredRepos)
                    setRenderedFormValues(filteredRepos)
                  }}
                  className="absolute transition-colors focus:bg-accent hover:bg-accent p-1 top-1 -right-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted"
                >
                  <X className="w-4 h-4" />
                </button> */}
              </div>
            )
          })}

        <Button
          onClick={(e) => {
            e.preventDefault()
            const formValues = getValues()
            setRenderedFormValues([
              ...formValues.userEducations,
              {
                school: '',
                degree: '',
                current: false,
                startYear: '',
                endYear: null,
              },
            ])
          }}
        >
          <p className="h4">Add education</p>
        </Button>

        <Button disabled={isSubmitting}>
          <p className="h4">Update educations</p>
        </Button>
      </form>
    </Form>
  )
}

const formatRequestBodies = ({
  formData,
}: {
  formData: UserEducationsFormData
}) => {
  const removedUserIds = formData.userEducations.map((education) => {
    delete education.userId
    return education
  })

  const createEducations = removedUserIds.filter((education) => !education.id)

  const updateEducations = removedUserIds
    .filter((education) => education.id)
    .map((education) => ({
      userEducations: {
        update: {
          where: {
            id: education.id || '',
          },
          data: education,
        },
      },
    }))

  const formattedRequestBodies = {
    ...(createEducations.length
      ? {
          creates: { userEducations: { create: createEducations } },
        }
      : {}),
    ...(updateEducations.length
      ? {
          updates: updateEducations,
        }
      : {}),
  }

  return formattedRequestBodies
}
