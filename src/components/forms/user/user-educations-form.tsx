'use client'

// actions
import {
  userCreateCurrentUserEducation,
  userUpdateCurrentUserEducation,
  userDeleteCurrentUserEducation,
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
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
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
  UserEducationFormItem,
  UserCreateUpdateEducationsFormData,
  UserCreateEducationReqBody,
  UserUpdateEducationReqBody,
} from '@/src/types/user-types'
import { ServerResponse } from '@/src/types/server-types'

// validation
import { userCreateUpdateEducationsFormSchema } from '@/src/validation/user-validation'

interface UserEducationsForm {
  user: User
}

export const UserEducationsForm: React.FC<UserEducationsForm> = ({ user }) => {
  const router = useRouter()
  const { toast } = useToast()
  const { onClose } = useModal()

  const defaultCreatesValues: UserEducationFormItem[] = []

  const defaultUpdateValues: {
    recordId: string
    reqBody: UserEducationFormItem
  }[] =
    user.userEducations?.map((edu) => ({
      recordId: edu.id,
      reqBody: {
        school: edu.school,
        degree: edu.degree,
        startYear: edu.startYear,
        endYear: edu.endYear,
      },
    })) || []

  const [createFormValues, setCreateFormValues] =
    useState<UserEducationFormItem[]>(defaultCreatesValues)

  const [updateFormValues, setUpdateFormValues] = useState<
    {
      recordId: string
      reqBody: UserEducationFormItem
    }[]
  >(defaultUpdateValues)

  const [userEducationsToDelete, setUserEducationsToDelete] = useState<
    { id: string }[]
  >([])

  const form = useForm({
    resolver: zodResolver(userCreateUpdateEducationsFormSchema),
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
    async ({ create, update }: UserCreateUpdateEducationsFormData) => {
      const errorResponses: ServerResponse[] = []

      if (create.length) {
        const createReqBodies: UserCreateEducationReqBody[] = create.map(
          (reqBody) =>
            ({
              ...reqBody,
              userId: user.id,
            } as UserCreateEducationReqBody)
        )

        const createResponses = await Promise.all(
          createReqBodies.map(async (reqBody) => {
            return await userCreateCurrentUserEducation(reqBody)
          })
        )

        createResponses.forEach((res) => {
          if (!res?.success) errorResponses.push(res as ServerResponse)
        })
      }

      if (update.length) {
        const updateResponses = await Promise.all(
          update.map(async (formItem) => {
            return await userUpdateCurrentUserEducation(
              formItem.recordId,
              formItem.reqBody as UserUpdateEducationReqBody
            )
          })
        )

        updateResponses.forEach((res) => {
          if (!res?.success) errorResponses.push(res as ServerResponse)
        })
      }

      if (userEducationsToDelete.length) {
        const deleteResponses = await Promise.all(
          userEducationsToDelete.map(async ({ id }) => {
            return await userDeleteCurrentUserEducation(id)
          })
        )

        deleteResponses.forEach((res) => {
          if (!res?.success) errorResponses.push(res as ServerResponse)
        })
      }

      if (errorResponses.length) {
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
                  <p className="h4">Past education</p>

                  <FormField
                    name={`create.${i}.school`}
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
                    name={`create.${i}.degree`}
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
                        (_, j) => {
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

          {updateFormValues.length > 0 &&
            updateFormValues.map((_, i, arr) => {
              return (
                <div key={i} className="relative flex flex-col gap-4">
                  <p className="h4">Past education</p>

                  <FormField
                    name={`update.${i}.reqBody.school`}
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
                    name={`update.${i}.reqBody.degree`}
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
                        (edu, j) => {
                          const isFiltered = i === j
                          if (isFiltered && edu.recordId) {
                            setUserEducationsToDelete((prevState) => [
                              ...(prevState ? prevState : []),
                              { id: edu.recordId },
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
        </ModalFormScrollArea>

        <button
          className="h4"
          onClick={(e) => {
            e.preventDefault()
            const formValues = getValues()

            const updatedCreateValues: UserEducationFormItem[] = [
              {
                school: '',
                degree: '',
                startYear: '',
                endYear: undefined,
              } as UserEducationFormItem,
              ...formValues.create,
            ]

            setCreateFormValues(updatedCreateValues)
            setValue('create', updatedCreateValues)
          }}
        >
          Add education
        </button>

        <Button className="h4" disabled={isSubmitting}>
          Update educations
        </Button>
      </form>
    </Form>
  )
}
