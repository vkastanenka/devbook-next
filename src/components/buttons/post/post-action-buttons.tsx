'use client'

// actions
import {
  postCreateCurrentUserPostLike,
  postDeleteCurrentUserPostLike,
} from '@/src/actions/post-actions'

// components
import Link from 'next/link'

// svg
import {
  CircleArrowRight,
  MessageSquareText,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react'

// utils
import { usePathname, useRouter } from 'next/navigation'
import { useModal } from '@/src/hooks/use-modal-store'
import { useToast } from '@/src/hooks/use-toast'

// types
import { Post } from '@/src/types/post-types'
import { User } from '@/src/types/user-types'

interface PostActionButtons {
  className?: string
  currentUser: User
  post: Post
}

export const PostActionButtons: React.FC<PostActionButtons> = ({
  className,
  currentUser,
  post,
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()
  const { onOpen } = useModal()

  const styleButton =
    'button-text gap-1 flex justify-center items-center py-1 px-1 md:py-3 md:px-2'

  let postLikeId: string | undefined

  post.postLikes?.every((postLike) => {
    if (postLike.userId === currentUser.id) {
      postLikeId = postLike.id
      return false
    }
    return true
  })

  const likePost = async () => {
    let response

    if (postLikeId) {
      response = await postDeleteCurrentUserPostLike(postLikeId)
    } else {
      response = await postCreateCurrentUserPostLike({
        postId: post.id,
        userId: currentUser.id,
      })
    }

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
      variant: 'success',
      description: response.message,
    })
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-1 w-full">
        <div className="flex items-center gap-2">
          <button className={styleButton} onClick={likePost}>
            {postLikeId ? <ThumbsDown /> : <ThumbsUp />}
            <div className="hidden md:block">
              {postLikeId ? 'Unlike' : 'Like'}
            </div>
          </button>
          <button
            className={styleButton}
            onClick={() =>
              onOpen('postCommentForm', { post, user: currentUser })
            }
          >
            <MessageSquareText />
            <div className="hidden md:block">Comment</div>
          </button>
        </div>
        {!pathname.startsWith('/comments') && (
          <Link className={styleButton} href={`/comments/${post.id}`}>
            <div className="hidden md:block">View Comments</div>
            <CircleArrowRight />
          </Link>
        )}
      </div>
    </div>
  )
}
