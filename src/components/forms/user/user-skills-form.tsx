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

// svg
import { X } from 'lucide-react'

// utils
import { cn } from '@/src/lib/utils'
import { useForm } from 'react-hook-form'
import { useModal } from '@/src/hooks/use-modal-store'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useToast } from '@/src/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'

// types
import {
  User,
  UserUpdateSkillsFormData,
  UserUpdateUserReqBody,
} from '@/src/types/user-types'

// validation
import { userUpdateSkillsFormSchema } from '@/src/validation/user-validation'

interface UserSkillsForm {
  user: User
}

export const UserSkillsForm: React.FC<UserSkillsForm> = ({ user }) => {
  const router = useRouter()
  const { toast } = useToast()
  const { onClose } = useModal()

  const [renderedFormValues, setRenderedFormValues] = useState<string[]>(
    user.skills
  )

  const form = useForm({
    resolver: zodResolver(userUpdateSkillsFormSchema),
    defaultValues: {
      skills: user.skills,
    },
  })

  const {
    getValues,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = form

  const action: () => void = handleSubmit(
    async (formData: UserUpdateSkillsFormData) => {
      const response = await userUpdateCurrentUser(
        user.id,
        formData as UserUpdateUserReqBody
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
                    name={`skills.${i}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skill</FormLabel>
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
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      const formValues = getValues()
                      const filteredRepos = formValues.skills.filter(
                        (_, j) => !(i === j)
                      )
                      setValue('skills', filteredRepos)
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

            const updatedValues = ['', ...formValues.skills]

            setRenderedFormValues(updatedValues)
            setValue('skills', updatedValues)
          }}
        >
          <p className="h4">Add skill</p>
        </button>

        <Button disabled={isSubmitting}>
          <p className="h4">Update skills</p>
        </Button>
      </form>
    </Form>
  )
}
