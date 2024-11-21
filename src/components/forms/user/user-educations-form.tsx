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
} from '@vkastanenka/devbook-types/dist/user'
import { ServerResponse } from '@vkastanenka/devbook-types/dist/server'

// validation
import { userCreateUpdateEducationsFormSchema } from '@vkastanenka/devbook-validation/dist/user'

interface UserEducationsForm {
  user: User
}

export const UserEducationsForm: React.FC<UserEducationsForm> = ({ user }) => {
  const router = useRouter()
  const { toast } = useToast()
  const { onClose } = useModal()

  const defaultCreatesValues: UserEducationFormItem[] = [
    { school: '', degree: '', startYear: '', endYear: '' },
  ]

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
        endYear: edu.endYear || '',
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
    async ({ create, update }: UserCreateUpdateEducationsFormData) => {
      const errorResponses: ServerResponse[] = []

      if (create.length > 0) {
        const createReqBodies: UserCreateEducationReqBody[] = create.map(
          (reqBody) => {
            reqBody.endYear = reqBody.endYear || null

            return {
              ...reqBody,
              userId: user.id,
            } as UserCreateEducationReqBody
          }
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

      if (update && update.length > 0) {
        const updateResponses = await Promise.all(
          update.map(async (formItem) => {
            formItem.reqBody.endYear = formItem.reqBody.endYear || null

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

      if (userEducationsToDelete.length > 0) {
        const deleteResponses = await Promise.all(
          userEducationsToDelete.map(async ({ id }) => {
            return await userDeleteCurrentUserEducation(id)
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
        <ModalFormScrollArea className="h-[40vh] md:h-[30vh]">
          {createFormValues.length > 0 &&
            createFormValues.map((_, i, arr) => {
              return (
                <div key={i} className="relative flex flex-col gap-4">
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
                    className="absolute button-text top-1 right-0"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <p className="h4">Past Education</p>

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
                        <FormLabel>Start Year</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Start Year"
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
                        <FormLabel>End Year</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="End Year"
                            disabled={isSubmitting}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {i !== arr.length - 1 && <Separator />}
                </div>
              )
            })}

          {updateFormValues.length > 0 &&
            updateFormValues.map((_, i, arr) => {
              return (
                <div key={i} className="relative flex flex-col gap-4">
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
                      if (filteredValues) {
                        setValue('update', filteredValues)
                        setUpdateFormValues(filteredValues)
                      }
                    }}
                    className="absolute button-text top-1 right-0"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <p className="h4">Past Education</p>

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
                        <FormLabel>Start Year</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Start Year"
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
                        <FormLabel>End Year</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="End Year"
                            disabled={isSubmitting}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {i !== arr.length - 1 && <Separator />}
                </div>
              )
            })}
        </ModalFormScrollArea>

        <button
          className="h4 button-text justify-center"
          onClick={(e) => {
            e.preventDefault()
            const formValues = getValues()

            const updatedCreateValues: UserEducationFormItem[] = [
              {
                school: '',
                degree: '',
                startYear: '',
                endYear: '',
              } as UserEducationFormItem,
              ...formValues.create,
            ]

            setCreateFormValues(updatedCreateValues)
            setValue('create', updatedCreateValues)
          }}
        >
          Add Education
        </button>

        <Button className="h4" disabled={isSubmitting}>
          Update Education
        </Button>
      </form>
    </Form>
  )
}
