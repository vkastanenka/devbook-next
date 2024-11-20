'use client'

// actions
import { userUpdateCurrentUser } from '@/src/actions/user-actions'

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
  UserUpdateGithubReposFormData,
  UserUpdateUserReqBody,
} from '@/src/types/user-types'

// validation
import { userUpdateGithubReposFormSchema } from '@/src/validation/user-validation'

export const UserGithubReposForm: React.FC<{ user: User }> = ({ user }) => {
  const router = useRouter()
  const { toast } = useToast()
  const { onClose } = useModal()

  const [renderedFormValues, setRenderedFormValues] = useState<string[]>([
    ...(user.githubRepos.length > 0 ? user.githubRepos : ['']),
  ])

  const form = useForm({
    resolver: zodResolver(userUpdateGithubReposFormSchema),
    defaultValues: {
      githubRepos: [...(user.githubRepos.length > 0 ? user.githubRepos : [''])],
    },
  })

  const {
    getValues,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = form

  const action: () => void = handleSubmit(
    async (formData: UserUpdateGithubReposFormData) => {
      const response = await userUpdateCurrentUser(
        user.id,
        formData as UserUpdateUserReqBody
      )

      if (!response.data) {
        toast({
          title: 'Error!',
          description: response.message,
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
          {renderedFormValues.length > 0 &&
            renderedFormValues.map((_, i) => {
              return (
                <div key={i} className="relative">
                  <FormField
                    name={`githubRepos.${i}`}
                    defaultValue={''}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Repo URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Repo URL"
                            disabled={isSubmitting}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      const formValues = getValues()
                      const filteredRepos = formValues.githubRepos.filter(
                        (_, j) => !(i === j)
                      )
                      setValue('githubRepos', filteredRepos)
                      setRenderedFormValues(filteredRepos)
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

            const updatedValues = ['', ...formValues.githubRepos]

            setRenderedFormValues(updatedValues)
            setValue('githubRepos', updatedValues)
          }}
        >
          Add Repo
        </button>

        <Button className="h4" disabled={isSubmitting}>
          Update Repos
        </Button>
      </form>
    </Form>
  )
}
