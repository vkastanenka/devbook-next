// utils
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

// types
import { Post, PostLike } from '@/src/types/post-types'

interface FeedStore {
  currentPost?: Post
  feedPosts: Post[]
  setFeedPosts: (payload: Post[]) => void
  addFeedPost: (payload: Post) => void
  updateFeedPost: (payload: Post) => void
  deleteFeedPost: (payload: Post) => void
  addFeedPostLike: (payload: PostLike) => void
  deleteFeedPostLike: (payload: PostLike) => void
}

export const useFeedStore = create<FeedStore>()(
  immer((set) => ({
    currentPost: undefined,
    feedPosts: [] as Post[],
    setFeedPosts: (payload: Post[]) =>
      set((state) => {
        state.feedPosts = payload
      }),
    addFeedPost: (payload: Post) =>
      set(({ feedPosts }) => {
        feedPosts.unshift(payload)
      }),
    updateFeedPost: (payload: Post) =>
      set(({ feedPosts }) => {
        const feedPostIdx = feedPosts.findIndex(
          (post) => post.id === payload.id
        )
        feedPosts.splice(feedPostIdx, 1, payload)
      }),
    deleteFeedPost: (payload: Post) =>
      set(({ feedPosts }) => {
        const feedPostIdx = feedPosts.findIndex(
          (post) => post.id === payload.id
        )
        feedPosts.splice(feedPostIdx, 1)
      }),
    addFeedPostLike: (payload: PostLike) =>
      set(({ feedPosts }) => {
        const feedPost = feedPosts.find((post) => post.id === payload.postId)
        if (feedPost) {
          const _count = {
            ...(feedPost._count ? feedPost._count : { postLikes: 0 }),
          }
          _count.postLikes = (_count.postLikes || 0) + 1
          feedPost._count = _count

          if (!feedPost.postLikes) feedPost.postLikes = [payload]
          else if (feedPost.postLikes) feedPost.postLikes.push(payload)
        }
      }),
    deleteFeedPostLike: (payload: PostLike) =>
      set(({ feedPosts }) => {
        const feedPost = feedPosts.find((post) => post.id === payload.postId)
        if (feedPost) {
          const _count = {
            ...(feedPost._count ? feedPost._count : { postLikes: 0 }),
          }
          _count.postLikes = (_count.postLikes || 1) - 1
          feedPost._count = _count

          if (feedPost.postLikes) {
            const postLikeIdx = feedPost.postLikes.indexOf(payload)
            feedPost.postLikes.splice(postLikeIdx, 1)
          }
        }
      }),
  }))
)
