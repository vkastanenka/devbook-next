'use client'

// actions
import { postDeleteCurrentUserPost } from '@/src/actions/post-actions'

// svg
import { Pencil, X } from 'lucide-react'

// utils
import { useRouter } from 'next/navigation'
import { useModal } from '@/src/hooks/use-modal-store'
import { useToast } from '@/src/hooks/use-toast'

// types
import { Post } from '@/src/types/post-types'
import { User } from '@/src/types/user-types'

interface PostCurrentUserOptionsButtons {
  post: Post
  currentUser: User
  onDeleteRedirectPath?: string
}

export const PostCurrentUserOptionsButtons: React.FC<
  PostCurrentUserOptionsButtons
> = ({ post, currentUser, onDeleteRedirectPath }) => {
  const router = useRouter()
  const { toast } = useToast()
  const { onOpen } = useModal()

  if (currentUser.id !== post.userId) return null

  const deletePost = async () => {
    const response = await postDeleteCurrentUserPost(post.id)

    if (!response.success) {
      toast({
        title: 'Error!',
        description: response.message,
        variant: 'destructive',
      })
      return
    }

    router.refresh()

    toast({
      title: 'Success!',
      description: response.message,
    })

    if (onDeleteRedirectPath) router.push(onDeleteRedirectPath)
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
