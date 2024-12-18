'use client'

// actions
import { postDeleteCurrentUserPost } from '@/src/actions/post-actions'

// components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuOptionsTrigger,
} from '@/src/components/ui/dropdown-menu'

// svg
import { Pencil, X } from 'lucide-react'

// utils
import { useRouter } from 'next/navigation'
import { useModal } from '@/src/hooks/use-modal-store'
import { useFeedStore } from '@/src/hooks/use-feed-store'
import { useToast } from '@/src/hooks/use-toast'

// types
import { Post } from '@vkastanenka/devbook-types/dist/post'
import { User } from '@vkastanenka/devbook-types/dist/user'

interface PostCurrentUserOptionsButtons {
  className?: string
  currentUser: User
  onDeleteRedirectPath?: string
  post: Post
}

export const PostCurrentUserOptionsButtons: React.FC<
  PostCurrentUserOptionsButtons
> = ({ className, post, currentUser, onDeleteRedirectPath }) => {
  const router = useRouter()
  const { toast } = useToast()
  const { onOpen } = useModal()
  const { deleteFeedPost } = useFeedStore()

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

    deleteFeedPost(post)

    if (onDeleteRedirectPath) router.push(onDeleteRedirectPath)
  }

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger className="group ">
          <DropdownMenuOptionsTrigger />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Post Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={() => onOpen('postForm', { post, user: currentUser })}
          >
            <Pencil />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={deletePost}
          >
            <X />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
