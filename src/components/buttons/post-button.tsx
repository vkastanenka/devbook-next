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
      <div className="rounded-full bg-background border-[1px] border-border px-[12px] py-2 text-left">
        <Typography.P>{children}</Typography.P>
      </div>
    </button>
  )
}
