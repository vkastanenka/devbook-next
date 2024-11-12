'use client'

// actions
import { postDeleteCurrentUserComment } from '@/src/actions/post-actions'

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
import { Comment } from '@/src/types/post-types'
import { User } from '@/src/types/user-types'

interface CommentCurrentUserOptionsButtons {
  comment: Comment
  currentUser?: User
  onDeleteRedirectPath?: string
  className?: string
}

export const CommentCurrentUserOptionsButtons: React.FC<
  CommentCurrentUserOptionsButtons
> = ({ comment, currentUser, onDeleteRedirectPath, className }) => {
  const router = useRouter()
  const { toast } = useToast()
  const { onOpen } = useModal()

  if (currentUser?.id !== comment.userId) return null

  const deleteComment = async () => {
    const response = await postDeleteCurrentUserComment(comment.id)

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
          <div className="w-8 h-8 bg-card border rounded-full relative">
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
          <DropdownMenuLabel>Comment Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => onOpen('postCommentForm', { comment })}
          >
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={deleteComment}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
