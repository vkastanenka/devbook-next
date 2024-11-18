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

// utils
import { useRouter } from 'next/navigation'
import { useModal } from '@/src/hooks/use-modal-store'
import { useFeedStore } from '@/src/hooks/use-feed-store'
import { useToast } from '@/src/hooks/use-toast'

// types
import { Post } from '@/src/types/post-types'
import { User } from '@/src/types/user-types'

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
  const { feedCurrentPost, deleteFeedPost, setFeedCurrentPost } = useFeedStore()

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

    if (feedCurrentPost) setFeedCurrentPost(undefined)
    else deleteFeedPost(post)

    toast({
      title: 'Success!',
      description: response.message,
    })

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
            onClick={() => onOpen('postForm', { post, user: currentUser })}
          >
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={deletePost}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
