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
  DropdownMenuOptionsTrigger,
} from '@/src/components/ui/dropdown-menu'

// svg
import { Pencil, X } from 'lucide-react'

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

    if (onDeleteRedirectPath) router.push(onDeleteRedirectPath)
  }

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <DropdownMenuOptionsTrigger />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Comment Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={() => onOpen('postCommentForm', { comment })}
          >
            <Pencil />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={deleteComment}
          >
            <X />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
