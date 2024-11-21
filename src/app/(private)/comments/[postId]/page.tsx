// actions
import { postReadComment, postReadPost } from '@/src/actions/post-actions'
import { userReadCurrentUser } from '@/src/actions/user-actions'

// components
import Link from 'next/link'
import { PostComments } from '@/src/components/ui/post-comments'
import { PostCard } from '@/src/components/cards/post/post-card'
import { CurrentUserContactsCard } from '@/src/components/cards/user/current-user-contacts-card'
import { NoContentCard } from '@/src/components/cards/no-content/no-content-card'

// svg
import { CircleArrowLeft } from 'lucide-react'

// utils
import { redirect } from 'next/navigation'

// types
import { Comment } from '@vkastanenka/devbook-types/dist/post'

interface CommentsPage {
  params: {
    postId: string
  }
  searchParams: {
    parentCommentId?: string
  }
}

const CommentsPage: React.FC<CommentsPage> = async ({
  params: { postId },
  searchParams: { parentCommentId },
}) => {
  if (!postId) redirect('/feed')

  const { data: readCurrentUserResData, message: readCurrentUserResMessage } =
    await userReadCurrentUser({
      include: { contacts: { orderBy: { createdAt: 'desc' } } },
    })

  if (!readCurrentUserResData) {
    return (
      <NoContentCard heading="Error!" subheading={readCurrentUserResMessage} />
    )
  }

  const { data: readPostResData, message: readPostResMessage } =
    await postReadPost(postId, {
      include: {
        comments: {
          where: { parentCommentId: null },
          orderBy: { createdAt: 'desc' },
          include: {
            ...subCommentsQuery,
            commentLikes: true,
            user: true,
            _count: { select: { subComments: true, commentLikes: true } },
          },
        },
        postLikes: true,
        user: true,
        _count: { select: { comments: true, postLikes: true } },
      },
    })

  if (!readPostResData) {
    return <NoContentCard heading="Error!" subheading={readPostResMessage} />
  }

  let parentComment: Comment | undefined
  let isParentCommentTopLayer: boolean = false

  readPostResData.comments?.every((comment) => {
    if (comment.id === parentCommentId) {
      isParentCommentTopLayer = true
      return false
    }
    return true
  })

  if (parentCommentId && !isParentCommentTopLayer) {
    const response = await postReadComment(parentCommentId, {
      include: {
        ...subCommentsQuery,
        commentLikes: true,
        user: true,
        _count: { select: { subComments: true, commentLikes: true } },
      },
    })

    if (!response.data) {
      return
    }

    parentComment = response.data
  }

  return (
    <div className="flex gap-8">
      <div className="basis-full lg:basis-2/3 xl:basis-3/4 flex items-start gap-4 relative">
        <Link
          href="/feed"
          className="button-text hidden xl:flex gap-2 absolute md:-left-9 top-card"
        >
          <CircleArrowLeft />
        </Link>
        <div className="w-full flex flex-col gap-8">
          <PostCard
            isCurrentPost={true}
            post={readPostResData}
            currentUser={readCurrentUserResData}
            onDeleteRedirectPath="/feed"
          />
          <PostComments
            parentComment={parentComment}
            post={readPostResData}
            currentUser={readCurrentUserResData}
            subCommentLayerLimit={SUB_COMMENT_LAYER_LIMIT}
          />
        </div>
      </div>

      <div className="hidden lg:block lg:basis-1/3 xl:basis-1/4">
        <CurrentUserContactsCard currentUser={readCurrentUserResData} />
      </div>
    </div>
  )
}

export default CommentsPage

const SUB_COMMENT_LAYER_LIMIT = 3

const recursivelyIncludeSubcommentsQuery = (
  count: number,
  query: { [key: string]: any }
) => {
  if (count === 1) {
    return query
  }

  const nestedQuery = {
    subComments: {
      orderBy: { createdAt: 'desc' },
      include: {
        ...query,
        user: true,
        _count: { select: { subComments: true, commentLikes: true } },
      },
    },
  }

  return recursivelyIncludeSubcommentsQuery(count - 1, nestedQuery)
}

export const subCommentsQuery = recursivelyIncludeSubcommentsQuery(
  SUB_COMMENT_LAYER_LIMIT,
  {
    subComments: {
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
        _count: { select: { subComments: true, commentLikes: true } },
      },
    },
  }
)
