// utils
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

// types
import { Comment, CommentLike, Post, PostLike } from '@/src/types/post-types'

interface FeedStore {
  currentPost?: Post
  feedPosts: Post[]
  setFeedPosts: (payload: Post[]) => void
  addFeedPost: (payload: Post) => void
  updateFeedPost: (payload: Post) => void
  deleteFeedPost: (payload: Post) => void
  addFeedPostLike: (payload: PostLike) => void
  deleteFeedPostLike: (payload: PostLike) => void
  addFeedPostComment: (payload: Comment) => void
  updateFeedPostComment: (payload: Comment) => void
  deleteFeedPostComment: (payload: Comment) => void
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
        const feedPost = feedPosts.find((post) => post.id === payload.id)
        if (feedPost) feedPost.body = payload.body
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
            ...(feedPost._count ? feedPost._count : { postLikes: 1 }),
          }
          _count.postLikes = (_count.postLikes || 1) - 1
          feedPost._count = _count

          if (feedPost.postLikes) {
            const postLikeIdx = feedPost.postLikes.indexOf(payload)
            feedPost.postLikes.splice(postLikeIdx, 1)
          }
        }
      }),
    addFeedPostComment: (payload: Comment) =>
      set(({ feedPosts }) => {
        console.log('adding my comment here!')
        const feedPost = feedPosts.find((post) => post.id === payload.postId)
        if (feedPost) {
          const _count = {
            ...(feedPost._count ? feedPost._count : { comments: 0 }),
          }
          _count.comments = (_count.comments || 0) + 1
          feedPost._count = _count

          if (!payload.parentCommentId) {
            if (!feedPost.comments) feedPost.comments = [payload]
            else if (feedPost.comments) feedPost.comments.unshift(payload)
          }
        }

        // Subcomments => Obtain parent comment through .flat() and update?
        // if (feedPost && payload.parentCommentId) {
        //   if (feedPost.comments) {
        //     console.log(feedPost.comments.flat())
        //   }
        // }
      }),
    updateFeedPostComment: (payload: Comment) =>
      set(({ feedPosts }) => {
        const feedPost = feedPosts.find((post) => post.id === payload.postId)
        if (feedPost) {
          if (!payload.parentCommentId && feedPost.comments) {
            const feedPostCommentIdx = feedPost.comments.findIndex(
              (comment) => comment.id === payload.id
            )
            feedPost.comments.splice(feedPostCommentIdx, 1, payload)
          }
        }

        // Subcomments => Obtain parent comment through .flat() and update?
        // if (feedPost && payload.parentCommentId) {
        //   if (feedPost.comments) {
        //     console.log(feedPost.comments.flat())
        //   }
        // }
      }),
    deleteFeedPostComment: (payload: Comment) =>
      set(({ feedPosts }) => {
        const feedPost = feedPosts.find((post) => post.id === payload.postId)
        if (feedPost) {
          const _count = {
            ...(feedPost._count ? feedPost._count : { comments: 1 }),
          }
          _count.comments = (_count.comments || 1) - 1
          feedPost._count = _count
        }

        if (feedPost && feedPost.comments && !payload.parentCommentId) {
          const commentIdx = feedPost.comments.indexOf(payload)
          feedPost.comments.splice(commentIdx, 1)
        }

        // Subcomments => Obtain parent comment through .flat() and delete?
        // if (feedPost && payload.parentCommentId) {
        //   if (feedPost.comments) {
        //     console.log(feedPost.comments.flat())
        //   }
        // }
      }),
  }))
)
