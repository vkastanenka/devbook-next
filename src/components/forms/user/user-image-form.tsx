'use client'

// actions
import { userUpdateCurrentUserImage } from '@/src/actions/user-actions'

// components
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'

// svg
import { PackageCheck } from 'lucide-react'

// utils
import { useRef, useState } from 'react'
import { useModal } from '@/src/hooks/use-modal-store'
import { useRouter } from 'next/navigation'
import { useToast } from '@/src/hooks/use-toast'

// types
import { User } from '@vkastanenka/devbook-types/dist/user'

// validation
import { UserAvatar } from '../../ui/avatar'

interface UserImageForm {
  user: User
}

export const UserImageForm: React.FC<UserImageForm> = ({ user }) => {
  const router = useRouter()
  const { toast } = useToast()
  const { onClose } = useModal()

  const [formData, setFormData] = useState<FormData>()
  const [errors, setErrors] = useState<{ image: string }>()

  const inputRef = useRef<HTMLInputElement>(null)

  const action = async () => {
    if (formData) {
      const response = await userUpdateCurrentUserImage(formData)

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
  }

  return (
    <form
      action={action}
      autoComplete="off"
      className="flex flex-col gap-4 justify-center"
    >
      <div className="w-full">
        <button
          className="button-text border flex-col justify-center w-full py-4 px-4"
          onClick={() => inputRef.current?.click()}
        >
          {!errors && formData ? (
            <PackageCheck />
          ) : (
            <UserAvatar
              className="w-11 h-11 md:w-[72px] md:h-[72px] text-base md:text-2xl"
              user={user}
            />
          )}
          <p>{!errors && formData ? 'Upload Ready!' : 'Upload Photo'}</p>
        </button>

        {errors?.image && <p className="text-destructive">{errors.image}</p>}
      </div>

      <Input
        className="hidden"
        hidden
        name="image"
        onChange={(e) => {
          if (errors) setErrors(undefined)
          if (e.target.files) {
            const file = e.target.files[0]

            if (!file.type.includes('image')) {
              setErrors({ image: 'File must be an image.' })
              return
            }

            if (file.size > 5000000) {
              setErrors({ image: '5 Mb file limit.' })
              return
            }

            const formData = new FormData()
            formData.append('image', file)
            setFormData(formData)
          }
        }}
        ref={inputRef}
        tabIndex={-1}
        type="file"
      />

      <Button className="h4" disabled={!formData}>
        Update User
      </Button>
    </form>
  )
}
