// utils
import { create } from 'zustand'

// types
import { Post } from '@/src/types/post-types'

interface FeedData {
  posts: Post[]
}

interface FeedStore {
  data: { posts: Post[] }
  setData: (data?: FeedData) => void
}

export const useFeedStore = create<FeedStore>((set) => ({
  data: { posts: [] },
  setData: (data = { posts: [] }) => set({ data }),
}))
