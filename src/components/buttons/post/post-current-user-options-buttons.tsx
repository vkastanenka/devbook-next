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
} from '@/src/components/ui/dropdown-menu'

// utils
import { useRouter } from 'next/navigation'
import { useModal } from '@/src/hooks/use-modal-store'
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
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="w-8 h-8 bg-card border border-muted rounded-full relative">
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center gap-1">
              {new Array(3).fill(0).map((_, i) => (
                <div
                  key={i}
                  className="bg-card-foreground h-[2px] w-[2px] rounded"
                />
              ))}
            </div>
          </div>
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
