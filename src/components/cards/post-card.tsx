// components
import Link from 'next/link'
import Image from 'next/image'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { CreateComment } from '@/components/modules/create-comment'
import { Overlay } from '@/components/utils/overlay'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { Typography } from '@/components/ui/typography'

import { ThumbsUp, Repeat, MessageSquareText, Forward, CircleArrowRight } from 'lucide-react'

// images
import postImage from '/public/images/post-photo-1.jpg'

export const PostCard: React.FC = () => {
  return (
    <Card className="dark:bg-slate-900 py-card flex flex-col gap-4">
      <PostCardUser />
      {/* TODO: Format text input from textarea */}
      <PostCardText />
      <PostCardAttachment />
      <PostCardActivity />
      {/* TODO: Figure out background */}
      <Separator />
      <PostCardActions />
      <CreateComment />
      <PostCardViewCommentsButton />
    </Card>
  )
}

const PostCardUser = () => {
  const linkActive =
    'group-hover:text-purple-400 group-focus-within:text-purple-400'

  return (
    <div className="px-card">
      <Link href="/" className="group inline-flex gap-2">
        <Avatar className="avatar-sm relative overflow-hidden">
          <Overlay />
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className="bg-purple-400">VK</AvatarFallback>
        </Avatar>
        <div>
          <Typography.P className={linkActive}>
            Victoria Kastanenka
          </Typography.P>
          <Typography.Muted className={linkActive}>
            Software Engineer
          </Typography.Muted>
        </div>
      </Link>
    </div>
  )
}

const PostCardText = () => {
  return (
    <div className="px-card">
      <Typography.P className="flex flex-col gap-4">
        <span className="block">
          🌐 Just launched my latest full stack web app, and I couldn’t be more
          thrilled! 🎉 It’s a task management tool designed to enhance team
          collaboration and boost productivity.🔧 Tech stack:
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
    <button className="group relative overflow-hidden">
      <Overlay />
      <AspectRatio ratio={2 / 1}>
        <Image
          alt="post-image"
          src={postImage}
          className="h-full w-full object-cover"
        />
      </AspectRatio>
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
  return (
    <div className="px-card">
      <div className="flex items-center gap-1 [&>*]:gap-2 [&>*]:basis-full [&>*]:flex [&>*]:justify-center [&>*]:items-center [&>*]:py-3">
        <button>
          <ThumbsUp />
          <Typography.P>Like</Typography.P>
        </button>
        <button>
          <MessageSquareText />
          <Typography.P>Comment</Typography.P>
        </button>
        <button>
          <Repeat />
          <Typography.P>Repost</Typography.P>
        </button>
        <button>
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
        <button className='flex items-center gap-2'>
          <Typography.P>View comments</Typography.P>
          <CircleArrowRight />
        </button>
      </div>
    </div>
  )
}
