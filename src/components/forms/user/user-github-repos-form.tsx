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

// svg
import { X } from 'lucide-react'

// utils
import { cn } from '@/src/lib/utils'
import { useState } from 'react'
import { updateUser } from '@/actions/user-actions'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { useModal } from '@/hooks/use-modal-store'

// types
import { User } from '@/types/user-types'
import { githubReposFormSchema, GithubReposFormData } from '@/validation/user'

export const UserGithubReposForm: React.FC<{ user: User }> = ({ user }) => {
  const router = useRouter()
  const { toast } = useToast()
  const { onClose } = useModal()

  const [renderedFormValues, setRenderedFormValues] = useState<string[]>(
    user.githubRepositories
  )

  const form = useForm({
    resolver: zodResolver(githubReposFormSchema),
    defaultValues: {
      githubRepositories: user.githubRepositories,
    },
  })

  const {
    getValues,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = form

  const action: () => void = handleSubmit(
    async (formData: GithubReposFormData) => {
      const response = await updateUser(formData, user)

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
                      const filteredRepos =
                        formValues.githubRepositories.filter(
                          (_, j) => !(i === j)
                        )
                      setValue('githubRepositories', filteredRepos)
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

            const updatedValues = ['', ...formValues.githubRepositories]

            setRenderedFormValues(updatedValues)
            setValue('githubRepositories', updatedValues)
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
