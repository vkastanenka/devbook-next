'use client'

// actions
import {
  userCreateCurrentUserExperience,
  userUpdateCurrentUserExperience,
  userDeleteCurrentUserExperience,
} from '@/actions/user-actions'

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
import { cn } from '@/src/lib/utils'
import { useForm } from 'react-hook-form'
import { useModal } from '@/hooks/use-modal-store'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'

// types
import {
  User,
  UserExperienceFormItem,
  UserCreateUpdateExperiencesFormData,
  UserCreateCurrentUserExperienceReqBody,
  UserUpdateExperienceReqBody,
} from '@/src/types/user-types'
import { ServerResponse } from '@/src/types/server-types'

// validation
import { userCreateUpdateExperiencesFormSchema } from '@/src/validation/user-validation'

interface UserExperiencesForm {
  user: User
}

export const UserExperiencesForm: React.FC<UserExperiencesForm> = ({
  user,
}) => {
  const router = useRouter()
  const { toast } = useToast()
  const { onClose } = useModal()

  const defaultCreatesValues: UserExperienceFormItem[] = []

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
      update: defaultUpdateValues,
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

      if (create.length) {
        const createReqBodies: UserCreateCurrentUserExperienceReqBody[] =
          create.map(
            (reqBody) =>
              ({
                ...reqBody,
                userId: user.id,
              } as UserCreateCurrentUserExperienceReqBody)
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

      if (update.length) {
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

      if (userExperiencesToDelete.length) {
        const deleteResponses = await Promise.all(
          userExperiencesToDelete.map(async ({ id }) => {
            return await userDeleteCurrentUserExperience(id)
          })
        )

        deleteResponses.forEach((res) => {
          if (!res?.success) errorResponses.push(res as ServerResponse)
        })
      }

      // If any server errors from any response, give toast message
      if (errorResponses.length) {
        toast({
          title: 'Error!',
          description: 'Error performing update',
          variant: 'destructive',
        })
      }

      // If successful, refresh page
      if (!errorResponses.length) {
        onClose()
        router.refresh()
        toast({
          title: 'Success!',
          description: 'User experiences updated',
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
        <div
          className={cn(
            'flex flex-col gap-4 max-h-[500px] overflow-y-auto',
            createFormValues.length > 1 || updateFormValues.length > 1
              ? 'pr-4'
              : ''
          )}
        >
          {createFormValues.length > 0 &&
            createFormValues.map((_, i, arr) => {
              return (
                <div key={i} className="relative flex flex-col gap-4">
                  <p className="h4">Past experience</p>

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
                    className="absolute transition-colors focus:bg-accent hover:bg-accent p-1 top-0 right-0 rounded-full bg-muted"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )
            })}
        </div>

        {updateFormValues.length > 0 &&
          updateFormValues.map((_, i, arr) => {
            return (
              <div key={i} className="relative flex flex-col gap-4">
                <p className="h4">Past experience</p>

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
                          <SelectItem value="Contract">{'Contract'}</SelectItem>
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
                    setValue('update', filteredValues)
                    setUpdateFormValues(filteredValues)
                  }}
                  className="absolute transition-colors focus:bg-accent hover:bg-accent p-1 top-0 right-0 rounded-full bg-muted"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )
          })}

        <button
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
          <p className="h4">Add experience</p>
        </button>

        <Button disabled={isSubmitting}>
          <p className="h4">Update experiences</p>
        </Button>
      </form>
    </Form>
  )
}
