// components
import Link from 'next/link'
import Image from 'next/image'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Card } from '@/components/ui/card'
import { CreateComment } from '@/components/modules/create-comment'
import { Overlay } from '@/components/utils/overlay'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { Typography } from '@/components/ui/typography'
import { UserDetails } from '@/components/modules/user-details'

import {
  ThumbsUp,
  Repeat,
  MessageSquareText,
  Forward,
  CircleArrowRight,
} from 'lucide-react'

// images
import postImage from '/public/images/post-photo-1.jpg'

export const PostCard: React.FC = () => {
  return (
    <Card className="py-card bg-card flex flex-col gap-4">
      <PostCardUser />
      <PostCardText />
      <PostCardAttachment />
      <PostCardActivity />
      {/* TODO: Figure out background */}
      <Separator />
      <PostCardActions />
      <PostCardCreateComment />
      <PostCardViewCommentsButton />
    </Card>
  )
}

const PostCardUser: React.FC = () => {
  return (
    <div className="px-card">
      <div className="inline-block">
        <Overlay>
          <Link href="/" className="inline-block">
            <UserDetails />
          </Link>
        </Overlay>
      </div>
    </div>
  )
}

// TODO: Make sure formatted text rendered properly
const PostCardText = () => {
  return (
    <div className="px-card">
      <Typography.P className="flex flex-col gap-4">
        <span className="block">
          🌐 Just launched my latest full stack web app, and I couldn’t be more
          thrilled! 🎉 It’s a task management tool designed to enhance team
          collaboration and boost productivity.🔧 Tech stack:{'\n'}
        </span>
        <span>
          <span className="block">
            Front end: React for a dynamic user experience
          </span>
          <span className="block">
            Back end: Node.js with Express for a seamless API
          </span>
          <span className="block">
            Database: MongoDB for flexible data handling
          </span>
        </span>
        <span className="block">
          💡 Features include real-time updates, easy drag-and-drop
          functionality, and customizable workflows. Huge thanks to everyone who
          supported me during the development process! 🙌
        </span>
        <span className="block">Can’t wait to hear what you all think!</span>
      </Typography.P>
    </div>
  )
}

const PostCardAttachment = () => {
  return (
    <button>
      <Overlay>
        <AspectRatio ratio={2 / 1}>
          <Image
            alt="post-image"
            src={postImage}
            className="h-full w-full object-cover"
          />
        </AspectRatio>
      </Overlay>
    </button>
  )
}

const PostCardActivity = () => {
  return (
    <div className="px-card">
      <div className="flex justify-between dark:text-slate-400">
        <div className="flex justify-center gap-1">
          <ThumbsUp className="w-4" />
          <Typography.Muted>45</Typography.Muted>
        </div>
        <div className="flex justify-center gap-4">
          <div className="flex justify-center gap-1">
            <Repeat className="w-4" />
            <Typography.Muted>52</Typography.Muted>
          </div>
          <div className="flex justify-center gap-1">
            <MessageSquareText className="w-4" />
            <Typography.Muted>248</Typography.Muted>
          </div>
        </div>
      </div>
    </div>
  )
}

const PostCardActions = () => {
  const styleButton =
    'rounded-lg gap-2 basis-full flex justify-center items-center py-3 hover:bg-white/10 hover:text-purple-400 focus:bg-white/10 focus:text-purple-400'

  return (
    <div className="px-card">
      <div className="flex items-center gap-1">
        <button className={styleButton}>
          <ThumbsUp />
          <Typography.P>Like</Typography.P>
        </button>
        <button className={styleButton}>
          <MessageSquareText />
          <Typography.P>Comment</Typography.P>
        </button>
        <button className={styleButton}>
          <Repeat />
          <Typography.P>Repost</Typography.P>
        </button>
        <button className={styleButton}>
          <Forward />
          <Typography.P>Share</Typography.P>
        </button>
      </div>
    </div>
  )
}

const PostCardViewCommentsButton = () => {
  return (
    <div className="px-card">
      <div className="flex justify-end">
        <Overlay>
          <button className="focus:text-purple-400 hover:text-purple-400 flex items-center gap-2 px-3 py-2">
            <Typography.P>View comments</Typography.P>
            <CircleArrowRight />
          </button>
        </Overlay>
      </div>
    </div>
  )
}

const PostCardCreateComment = () => {
  return (
    <div className="px-card">
      <CreateComment />
    </div>
  )
}
