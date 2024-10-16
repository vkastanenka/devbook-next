'use client'

// components
import { Typography } from '@/components/ui/typography'

interface Post {
  children: React.ReactNode
  onClick?: () => void
}

export const PostButton: React.FC<Post> = ({ children, onClick }) => {
  return (
    <button className="group basis-full" onClick={onClick}>
      <div className="rounded-full dark:bg-slate-800 group-hover:border-purple-400 group-focus-within:border-purple-400 group-hover:text-purple-400 group-focus-within:text-purple-400 group-hover:bg-slate-700 group-focus-within:bg-slate-700 border-[1px] dark:border-slate-400 dark:text-slate-400 px-[12px] py-2 text-left">
        <Typography.P>{children}</Typography.P>
      </div>
    </button>
  )
}
