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
import { Textarea } from '@/components/ui/textarea'
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

// validation
import { userExperiencesFormSchema } from '@/validation/user'

// types
import { User } from '@/types/user-types'
import {
  UserExperience,
  UserExperiencesFormItem,
  UserExperiencesFormData,
  CreateUserExperiencesReqBody,
  UpdateUserExperiencesReqBody,
  UserExperiencesFormItems,
} from '@/types/user-types'

export const UserExperiencesForm: React.FC<{ user: User }> = ({ user }) => {
  const router = useRouter()
  const { toast } = useToast()
  const { onClose } = useModal()

  const [userExperiencesToDelete, setUserExperiencesToDelete] =
    useState<{ id: string }[]>()

  const [renderedFormValues, setRenderedFormValues] = useState<
    UserExperiencesFormItems | undefined
  >(user.userExperiences)

  const form = useForm({
    resolver: zodResolver(userExperiencesFormSchema),
    defaultValues: {
      userExperiences: user.userExperiences,
    },
  })

  const {
    getValues,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = form

  const action: () => void = handleSubmit(
    async (formData: UserExperiencesFormData) => {
      const { userExperiences } = formData
      if (userExperiences) {
        let createRes, updateRes, deleteRes
        const { createReqBody, updateReqsBodies } =
          formatReqBody(userExperiences)

        // Send req to create educations
        if (createReqBody) {
          createRes = await updateUser(createReqBody, user)
        }

        // Send requests to update educations
        if (updateReqsBodies) {
          updateRes = await Promise.all(
            updateReqsBodies.map(async (reqBody) => {
              return await updateUser(reqBody, user)
            })
          )
        }

        // Send req to delete educations
        if (userExperiencesToDelete) {
          const reqBody = {
            userExperiences: {
              deleteMany: userExperiencesToDelete,
            },
          }

          deleteRes = await updateUser(reqBody, user)
        }

        // Check if any response has server error
        let resIncludesServerError = false

        if (createRes && !createRes?.success) {
          resIncludesServerError = true
        }

        updateRes?.every((res) => {
          if (!res?.success) {
            resIncludesServerError = true
            return false
          }
          return true
        })

        // if (!deleteRes?.success && !deleteRes?.errors) {
        //   resIncludesServerError = true
        // }

        // If any server errors from any response, give toast message
        if (resIncludesServerError) {
          toast({
            title: 'Error!',
            description: createRes?.message,
            variant: 'destructive',
          })
        }

        // If successful, refresh page
        if (!resIncludesServerError) {
          onClose()
          router.refresh()
          toast({
            title: 'Success!',
            description: createRes?.message,
          })
        }
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
          {renderedFormValues?.length
            ? renderedFormValues.map((_, i, arr) => {
                return (
                  <div key={i} className="relative flex flex-col gap-4">
                    <FormField
                      name={`userExperiences.${i}.company`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Company"
                              disabled={isSubmitting}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      name={`userExperiences.${i}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Title"
                              disabled={isSubmitting}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      name={`userExperiences.${i}.type`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Permanent">
                                {'Permanent'}
                              </SelectItem>
                              <SelectItem value="Contract">
                                {'Contract'}
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name={`userExperiences.${i}.schedule`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Schedule</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Schedule" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Full-time">
                                {'Full-time'}
                              </SelectItem>
                              <SelectItem value="Part-time">
                                {'Part-time'}
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      name={`userExperiences.${i}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={10}
                              placeholder="Description"
                              disabled={isSubmitting}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      name={`userExperiences.${i}.startYear`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start year</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
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
                      name={`userExperiences.${i}.endYear`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End year</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
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

                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        const formValues = getValues()
                        const filteredValues =
                          formValues.userExperiences?.filter((edu, j) => {
                            const isFiltered = i === j
                            if (isFiltered && edu.id) {
                              setUserExperiencesToDelete((prevState) => [
                                ...(prevState ? prevState : []),
                                { id: edu.id },
                              ])
                            }
                            return !isFiltered
                          })
                        setValue('userExperiences', filteredValues)
                        setRenderedFormValues(filteredValues)
                      }}
                      className="absolute transition-colors focus:bg-accent hover:bg-accent p-1 top-0 right-0 rounded-full bg-muted"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )
              })
            : null}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault()
            const formValues = getValues()

            const updatedValues = [
              {
                company: '',
                type: '',
                schedule: '',
                title: '',
                description: '',
                startYear: '',
                endYear: null,
              } as UserExperience,
              ...(formValues.userExperiences || []),
            ]

            setRenderedFormValues(updatedValues)
            setValue('userExperiences', updatedValues)
          }}
        >
          <p className="h4">Add experience</p>
        </button>

        <Button disabled={isSubmitting}>
          <p className="h4">Update experiences</p>
        </Button>
      </form>
    </Form>
  )
}

const formatReqBody = (formItems: UserExperiencesFormItems) => {
  const formItemsNoUserId = formItems.map((formItem) => {
    if ((formItem as UserExperience).userId) {
      delete (formItem as UserExperience).userId
    }
    return formItem
  })

  const createFormItems: UserExperiencesFormItem[] = formItemsNoUserId.filter(
    (formItem) => !(formItem as UserExperience).id
  )

  const createReqBody: CreateUserExperiencesReqBody = {
    userExperiences: { create: createFormItems },
  }

  const updateReqsBodies: UpdateUserExperiencesReqBody[] = formItemsNoUserId
    .filter((formItem) => (formItem as UserExperience).id)
    .map((formItem) => ({
      userExperiences: {
        update: {
          where: {
            id: (formItem as UserExperience).id,
          },
          data: formItem as UserExperience,
        },
      },
    }))

  const formattedRequestBodies = {
    ...(createFormItems.length
      ? {
          createReqBody,
        }
      : {}),
    ...(updateReqsBodies.length
      ? {
          updateReqsBodies,
        }
      : {}),
  }

  return formattedRequestBodies
}
