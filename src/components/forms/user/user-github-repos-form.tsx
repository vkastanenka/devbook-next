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
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

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
  UserUpdateGithubReposFormData,
  UserUpdateCurrentUserReqBody,
} from '@/src/types/user-types'

// validation
import { userUpdateGithubReposFormSchema } from '@/src/validation/user-validation'

export const UserGithubReposForm: React.FC<{ user: User }> = ({ user }) => {
  const router = useRouter()
  const { toast } = useToast()
  const { onClose } = useModal()

  const [renderedFormValues, setRenderedFormValues] = useState<string[]>(
    user.githubRepos
  )

  const form = useForm({
    resolver: zodResolver(userUpdateGithubReposFormSchema),
    defaultValues: {
      githubRepos: user.githubRepos,
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
        formData as UserUpdateCurrentUserReqBody
      )

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
            renderedFormValues && renderedFormValues?.length > 4 ? 'pr-4' : ''
          )}
        >
          {renderedFormValues.length > 0 &&
            renderedFormValues.map((_, i) => {
              return (
                <div key={i} className="relative">
                  <FormField
                    name={`githubRepositories.${i}`}
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
                    className="absolute transition-colors focus:bg-accent hover:bg-accent p-1 top-0 right-0 rounded-full bg-muted"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )
            })}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault()
            const formValues = getValues()

            const updatedValues = ['', ...formValues.githubRepos]

            setRenderedFormValues(updatedValues)
            setValue('githubRepos', updatedValues)
          }}
        >
          <p className="h4">Add repo</p>
        </button>

        <Button disabled={isSubmitting}>
          <p className="h4">Update repos</p>
        </Button>
      </form>
    </Form>
  )
}
