'use client'

// actions
import { postDeleteCurrentUserComment } from '@/src/actions/post-actions'

// utils
import { useModal } from '@/src/hooks/use-modal-store'
import { useToast } from '@/src/hooks/use-toast'

// types
import { Comment } from '@/src/types/post-types'
import { User } from '@/src/types/user-types'

interface PostCurrentUserCommentOptionButtons {
  comment: Comment
  currentUser?: User
}

export const PostCurrentUserCommentOptionButtons: React.FC<
  PostCurrentUserCommentOptionButtons
> = ({ comment, currentUser }) => {
  const { toast } = useToast()
  const { data, onOpen, setData } = useModal()

  if (currentUser?.id !== comment.userId) return null

  const deleteComment = async () => {
    const response = await postDeleteCurrentUserComment(comment.id)

    if (!response.success && !response.errors) {
      toast({
        title: 'Error!',
        description: response.message,
        variant: 'destructive',
      })
    }

    if (response.success && data.post?.comments) {
      const filteredComments = data.post.comments.filter((postComment) => {
        if (postComment.id === comment.id) return false
        return true
      })

      data.post.comments = filteredComments

      setData({ ...data, post: data.post })

      toast({
        title: 'Success!',
        description: response.message,
      })
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => onOpen('postCommentForm', { ...data, comment })}>
        <p className="muted">Update</p>
      </button>
      <button onClick={deleteComment}>
        <p className="muted">Delete</p>
      </button>
    </div>
  )
}
