// components
import Link from 'next/link'
import Image from 'next/image'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import {
  CircleArrowRight,
  Ellipsis,
  Forward,
  MessageSquareText,
  Pencil,
  Repeat,
  ThumbsUp,
  X,
} from 'lucide-react'

// images
import postImage from '/public/images/post-photo-1.jpg'
import { User } from '@/types/user-types'

interface PostCard {
  user: User
}

export const PostCard: React.FC<PostCard> = ({ user }) => {
  return (
    <Card className="relative py-card bg-card flex flex-col gap-4">
      <PostCardOptions />
      <PostCardUser user={user} />
      <PostCardText />
      <PostCardAttachment />
      <PostCardActivity />
      <Separator className="separator w-full" />
      <PostCardActions />
      <PostCardViewCommentsButton />
    </Card>
  )
}

const PostCardOptions = () => {
  const styleButton =
    'focus:bg-muted hover:bg-muted rounded-full p-2 transition-colors'

  return (
    <div className="absolute top-4 right-4 flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger className={styleButton}>
          <Ellipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <button className="flex w-full">
              <Pencil className="mr-2 mt-0.5 h-4 w-4" />
              <span>Edit</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <button className={styleButton}>
        <X />
      </button>
    </div>
  )
}

const PostCardUser: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="px-card">
      <div className="inline-block">
        <Link href={`/user/${user.username}`} className="inline-block">
          {/* <UserDetails user={user} /> */}
        </Link>
      </div>
    </div>
  )
}

// TODO: Make sure formatted text rendered properly
const PostCardText = () => {
  return (
    <div className="px-card">
      <p className="p flex flex-col gap-4">
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
      </p>
    </div>
  )
}

const PostCardAttachment = () => {
  return (
    <button>
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
      <div className="flex justify-between text-accent">
        <div className="flex justify-center gap-1">
          <ThumbsUp className="w-4" />
          <p className="muted">45</p>
        </div>
        <div className="flex justify-center gap-4">
          <div className="flex justify-center gap-1">
            <Repeat className="w-4" />
            <p className="muted">52</p>
          </div>
          <div className="flex justify-center gap-1">
            <MessageSquareText className="w-4" />
            <p className="muted">248</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const PostCardActions = () => {
  const styleButton = 'gap-2 basis-full flex justify-center items-center py-3'

  return (
    <div className="px-card">
      <div className="flex items-center gap-1">
        <button className={styleButton}>
          <ThumbsUp />
          <p className="p">Like</p>
        </button>
        <button className={styleButton}>
          <MessageSquareText />
          <p className="p">Comment</p>
        </button>
        <button className={styleButton}>
          <Repeat />
          <p className="p">Repost</p>
        </button>
        <button className={styleButton}>
          <Forward />
          <p className="p">Share</p>
        </button>
      </div>
    </div>
  )
}

const PostCardViewCommentsButton = () => {
  return (
    <div className="px-card">
      <div className="flex justify-end">
        {/* <Overlay> */}
        <button className="flex items-center gap-2 px-3 py-2">
          <p className="p">View comments</p>
          <CircleArrowRight />
        </button>
        {/* </Overlay> */}
      </div>
    </div>
  )
}
