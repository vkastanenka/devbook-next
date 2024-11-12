// actions
import { postReadPost } from '@/src/actions/post-actions'
import { userReadCurrentUser } from '@/src/actions/user-actions'

// components
import Link from 'next/link'
import { PostComments } from '@/src/components/ui/post'
import { PostCard } from '@/src/components/cards/post/post-card'
import { CurrentUserContactsCard } from '@/src/components/cards/user/current-user-contacts-card'
import { NoContentCard } from '@/src/components/cards/no-content/no-content-card'

// svg
import { CircleArrowLeft } from 'lucide-react'

// utils
import { redirect } from 'next/navigation'

interface CommentsPage {
  params: {
    postId: string
  }
}

const CommentsPage: React.FC<CommentsPage> = async ({ params: { postId } }) => {
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
        include: { ...query, user: true },
      },
    }

    return recursivelyIncludeSubcommentsQuery(count - 1, nestedQuery)
  }

  const subCommentsQuery = recursivelyIncludeSubcommentsQuery(5, {
    subComments: {
      orderBy: { createdAt: 'desc' },
      include: { user: true },
    },
  })

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

  return (
    <div className="flex gap-8">
      <div className="basis-full lg:basis-2/3 xl:basis-3/4 flex items-start gap-4">
        <Link href="/feed" className="flex gap-2 items-center">
          <CircleArrowLeft />
        </Link>
        <div className="w-full flex flex-col gap-8">
          <PostCard
            post={readPostResData}
            currentUser={readCurrentUserResData}
            onDeleteRedirectPath="/feed"
          />
          <PostComments
            post={readPostResData}
            currentUser={readCurrentUserResData}
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
