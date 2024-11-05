'use client'

// svg
import { Pencil, X } from 'lucide-react'

// utils
import { updateUser } from '@/src/actions-old/user-actions'
import { useModal } from '@/hooks/use-modal-store'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

// types
import { Post } from '@/types/post-types'
import { User } from '@/types/user-types'

export const PostOptionButtons: React.FC<{
  currentUser: User
  post: Post
}> = ({ currentUser, post }) => {
  const router = useRouter()
  const { toast } = useToast()
  const { onOpen } = useModal()

  if (currentUser.id !== post.userId) return null

  const deletePost = async () => {
    const reqBody = {
      posts: {
        deleteMany: [{ id: post.id }],
      },
    }

    // TODO: Fix TS
    const response = await updateUser(reqBody, currentUser)

    if (!response.success && !response.errors) {
      toast({
        title: 'Error!',
        description: response.message,
        variant: 'destructive',
      })
    }

    // If successful, push to user feed
    if (response.success) {
      router.refresh()
      toast({
        title: 'Success!',
        description: response.message,
      })
    }
  }

  return (
    <div className="absolute top-4 right-4 flex items-center gap-2">
      <button onClick={() => onOpen('postForm', { post, user: currentUser })}>
        <Pencil />
      </button>
      <button onClick={deletePost}>
        <X />
      </button>
    </div>
  )
}
