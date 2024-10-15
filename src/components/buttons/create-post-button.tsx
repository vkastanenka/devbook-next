'use client'

// components
import { Typography } from '@/components/ui/typography'

export const CreatePostButton = () => {
  return (
    <button className="group basis-full text-left" onClick={() => console.log('Open Post Modal!')}>
      <div className="rounded-full dark:bg-slate-800 group-hover:bg-slate-700 group-focus-within:bg-slate-700 border-[1px] dark:border-slate-400 dark:text-slate-400 px-[12px] py-2">
        <Typography.P>{`What's on your mind, Victoria?`}</Typography.P>
      </div>
    </button>
  )
}
