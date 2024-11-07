'use client'

// actions
import { postDeleteCurrentUserPost } from '@/src/actions/post-actions'

// svg
import { Pencil, X } from 'lucide-react'

// utils
import { useModal } from '@/src/hooks/use-modal-store'
import { useRouter } from 'next/navigation'
import { useToast } from '@/src/hooks/use-toast'

// types
import { Post } from '@/src/types/post-types'
import { User } from '@/src/types/user-types'

interface PostOptionButtons {
  post: Post
  user: User
}

export const PostOptionButtons: React.FC<PostOptionButtons> = ({
  post,
  user,
}) => {
  const router = useRouter()
  const { toast } = useToast()
  const { onOpen } = useModal()

  if (user.id !== post.userId) return null

  const deletePost = async () => {
    const response = await postDeleteCurrentUserPost(post.id)

    if (!response.success && !response.errors) {
      toast({
        title: 'Error!',
        description: response.message,
        variant: 'destructive',
      })
    }

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
      <button onClick={() => onOpen('postForm', { post, user })}>
        <Pencil />
      </button>
      <button onClick={deletePost}>
        <X />
      </button>
    </div>
  )
}
