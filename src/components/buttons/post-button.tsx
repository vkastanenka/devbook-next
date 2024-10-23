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
      <div className="rounded-full bg-input group-hover:bg-muted group-focus-within:bg-muted border-[1px] px-[12px] py-2 text-left transition-colors">
        <Typography.P>{children}</Typography.P>
      </div>
    </button>
  )
}
