// utils
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

// types
import { Comment, Post, PostLike } from '@vkastanenka/devbook-types/dist/post'

interface FeedStore {
  feedPosts: Post[]
  setFeedPosts: (payload: Post[]) => void
  addFeedPost: (payload: Post) => void
  updateFeedPost: (payload: Post) => void
  deleteFeedPost: (payload: Post) => void
  addFeedPostLike: (payload: PostLike) => void
  deleteFeedPostLike: (payload: PostLike) => void
  addFeedPostComment: (payload: Comment) => void
}

export const useFeedStore = create<FeedStore>()(
  immer((set) => ({
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
        const feedPost = feedPosts.find((post) => post.id === payload.id)
        if (feedPost) updatePost(feedPost, payload)
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
        if (feedPost) addPostLike(feedPost, payload)
      }),
    deleteFeedPostLike: (payload: PostLike) =>
      set(({ feedPosts }) => {
        const feedPost = feedPosts.find((post) => post.id === payload.postId)
        if (feedPost) deletePostLike(feedPost, payload)
      }),
    addFeedPostComment: (payload: Comment) =>
      set(({ feedPosts }) => {
        const feedPost = feedPosts.find((post) => post.id === payload.postId)
        if (feedPost) addComment(feedPost)
      }),
  }))
)

const updatePost = (post: Post, payload: Post) => {
  post.body = payload.body
  post.updatedAt = payload.updatedAt
}

const addComment = (post: Post) => {
  // Add count
  const _count = {
    ...(post._count ? post._count : { comments: 0 }),
  }
  _count.comments = (_count.comments || 0) + 1
  post._count = _count
}

const addPostLike = (post: Post, payload: PostLike) => {
  // Add count
  const _count = {
    ...(post._count ? post._count : { postLikes: 0 }),
  }
  _count.postLikes = (_count.postLikes || 0) + 1
  post._count = _count

  // Add postlike
  if (!post.postLikes) post.postLikes = [payload]
  else if (post.postLikes) post.postLikes.push(payload)
}

const deletePostLike = (post: Post, payload: PostLike) => {
  // Delete count
  const _count = {
    ...(post._count ? post._count : { postLikes: 1 }),
  }
  _count.postLikes = (_count.postLikes || 1) - 1
  post._count = _count

  // Delete postlike
  if (post.postLikes) {
    const postLikeIdx = post.postLikes.indexOf(payload)
    post.postLikes.splice(postLikeIdx, 1)
  }
}
