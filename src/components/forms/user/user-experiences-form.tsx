'use client'

// actions
import {
  userCreateCurrentUserExperience,
  userUpdateCurrentUserExperience,
  userDeleteCurrentUserExperience,
} from '@/src/actions/user-actions'

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
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Textarea } from '@/src/components/ui/textarea'
import { Separator } from '@/src/components/ui/separator'
import { ModalFormScrollArea } from '@/src/components/ui/modal-form-scroll-area'

// svg
import { X } from 'lucide-react'

// utils
import { useForm } from 'react-hook-form'
import { useModal } from '@/src/hooks/use-modal-store'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useToast } from '@/src/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'

// types
import {
  User,
  UserExperienceFormItem,
  UserCreateUpdateExperiencesFormData,
  UserCreateExperienceReqBody,
  UserUpdateExperienceReqBody,
} from '@vkastanenka/devbook-types/dist/user'
import { ServerResponse } from '@vkastanenka/devbook-types/dist/server'

// validation
import { userCreateUpdateExperiencesFormSchema } from '@vkastanenka/devbook-validation/dist/user'

interface UserExperiencesForm {
  user: User
}

export const UserExperiencesForm: React.FC<UserExperiencesForm> = ({
  user,
}) => {
  const router = useRouter()
  const { toast } = useToast()
  const { onClose } = useModal()

  const defaultCreatesValues: UserExperienceFormItem[] = [
    {
      company: '',
      type: '',
      schedule: '',
      title: '',
      description: '',
      startYear: '',
      endYear: '',
    },
  ]

  const defaultUpdateValues: {
    recordId: string
    reqBody: UserExperienceFormItem
  }[] =
    user.userExperiences?.map((exp) => ({
      recordId: exp.id,
      reqBody: {
        company: exp.company,
        type: exp.type,
        schedule: exp.schedule,
        title: exp.title,
        description: exp.description,
        startYear: exp.startYear,
        endYear: exp.endYear,
      },
    })) || []

  const [createFormValues, setCreateFormValues] =
    useState<UserExperienceFormItem[]>(defaultCreatesValues)

  const [updateFormValues, setUpdateFormValues] = useState<
    {
      recordId: string
      reqBody: UserExperienceFormItem
    }[]
  >(defaultUpdateValues)

  const [userExperiencesToDelete, setUserExperiencesToDelete] = useState<
    { id: string }[]
  >([])

  const form = useForm({
    resolver: zodResolver(userCreateUpdateExperiencesFormSchema),
    defaultValues: {
      create: defaultCreatesValues,
      update: defaultUpdateValues.length > 0 ? defaultUpdateValues : undefined,
    },
  })

  const {
    getValues,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = form

  const action: () => void = handleSubmit(
    async ({ create, update }: UserCreateUpdateExperiencesFormData) => {
      const errorResponses: ServerResponse[] = []

      if (create.length > 0) {
        const createReqBodies: UserCreateExperienceReqBody[] = create.map(
          (reqBody) =>
            ({
              ...reqBody,
              userId: user.id,
            } as UserCreateExperienceReqBody)
        )

        const createResponses = await Promise.all(
          createReqBodies.map(async (reqBody) => {
            return await userCreateCurrentUserExperience(reqBody)
          })
        )

        createResponses.forEach((res) => {
          if (!res?.success) errorResponses.push(res as ServerResponse)
        })
      }

      if (update && update.length > 0) {
        const updateResponses = await Promise.all(
          update.map(async (formItem) => {
            return await userUpdateCurrentUserExperience(
              formItem.recordId,
              formItem.reqBody as UserUpdateExperienceReqBody
            )
          })
        )

        updateResponses.forEach((res) => {
          if (!res?.success) errorResponses.push(res as ServerResponse)
        })
      }

      if (userExperiencesToDelete.length > 0) {
        const deleteResponses = await Promise.all(
          userExperiencesToDelete.map(async ({ id }) => {
            return await userDeleteCurrentUserExperience(id)
          })
        )

        deleteResponses.forEach((res) => {
          if (!res?.success) errorResponses.push(res as ServerResponse)
        })
      }

      if (errorResponses.length > 0) {
        toast({
          title: 'Error!',
          description: 'Error performing update',
          variant: 'destructive',
        })
        return
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
          {createFormValues.length > 0 &&
            createFormValues.map((_, i, arr) => {
              return (
                <div key={i} className="relative flex flex-col gap-4">
                  <p className="h4">Past Experience</p>

                  <FormField
                    name={`create.${i}.company`}
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
                    name={`create.${i}.title`}
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
                    name={`create.${i}.type`}
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
                    name={`create.${i}.schedule`}
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
                    name={`create.${i}.description`}
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
                    name={`create.${i}.startYear`}
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
                    name={`create.${i}.endYear`}
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
                      const filteredValues = formValues.create?.filter(
                        (exp, j) => {
                          const isFiltered = i === j
                          return !isFiltered
                        }
                      )
                      setValue('create', filteredValues)
                      setCreateFormValues(filteredValues)
                    }}
                    className="absolute button-text top-1 right-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )
            })}

          {updateFormValues.length > 0 &&
            updateFormValues.map((_, i, arr) => {
              return (
                <div key={i} className="relative flex flex-col gap-4">
                  <p className="h4">Past Experience</p>

                  <FormField
                    name={`update.${i}.reqBody.company`}
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
                    name={`update.${i}.reqBody.title`}
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
                    name={`update.${i}.reqBody.type`}
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
                    name={`update.${i}.reqBody.schedule`}
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
                    name={`update.${i}.reqBody.description`}
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
                    name={`update.${i}.reqBody.startYear`}
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
                    name={`update.${i}.reqBody.endYear`}
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
                      const filteredValues = formValues.update?.filter(
                        (exp, j) => {
                          const isFiltered = i === j
                          if (isFiltered && exp.recordId) {
                            setUserExperiencesToDelete((prevState) => [
                              ...(prevState ? prevState : []),
                              { id: exp.recordId },
                            ])
                          }
                          return !isFiltered
                        }
                      )
                      if (filteredValues) {
                        setValue('update', filteredValues)
                        setUpdateFormValues(filteredValues)
                      }
                    }}
                    className="absolute button-text top-1 right-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )
            })}
        </ModalFormScrollArea>

        <button
          className="h4 button-text"
          onClick={(e) => {
            e.preventDefault()
            const formValues = getValues()

            const updatedCreateValues: UserExperienceFormItem[] = [
              {
                company: '',
                type: 'Permanent',
                schedule: 'Full-time',
                title: '',
                description: '',
                startYear: '',
                endYear: '',
              } as UserExperienceFormItem,
              ...formValues.create,
            ]

            setCreateFormValues(updatedCreateValues)
            setValue('create', updatedCreateValues)
          }}
        >
          Add Experience
        </button>

        <Button className="h4" disabled={isSubmitting}>
          Update Experience
        </Button>
      </form>
    </Form>
  )
}
