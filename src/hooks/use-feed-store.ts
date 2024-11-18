// utils
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

// types
import { Comment, CommentLike, Post, PostLike } from '@/src/types/post-types'

interface FeedStore {
  feedCurrentPost?: Post
  setFeedCurrentPost: (payload: Post | undefined) => void
  addFeedCurrentPostComment: (payload: Comment) => void
  updateFeedCurrentPostComment: (payload: Comment) => void
  deleteFeedCurrentPostComment: (payload: Comment) => void
  addFeedCurrentPostLike: (payload: PostLike) => void
  deleteFeedCurrentPostLike: (payload: PostLike) => void
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
    feedCurrentPost: undefined,
    setFeedCurrentPost: (payload: Post | undefined) =>
      set((state) => (state.feedCurrentPost = payload)),
    addFeedCurrentPostComment: (payload: Comment) =>
      set(
        ({ feedCurrentPost }) =>
          feedCurrentPost && addComment(feedCurrentPost, payload)
      ),
    updateFeedCurrentPostComment: (payload: Comment) =>
      set(
        ({ feedCurrentPost }) =>
          feedCurrentPost && updateComment(feedCurrentPost, payload)
      ),
    deleteFeedCurrentPostComment: (payload: Comment) =>
      set(
        ({ feedCurrentPost }) =>
          feedCurrentPost && deleteComment(feedCurrentPost, payload)
      ),
    addFeedCurrentPostLike: (payload: PostLike) =>
      set(
        ({ feedCurrentPost }) =>
          feedCurrentPost && addPostLike(feedCurrentPost, payload)
      ),
    deleteFeedCurrentPostLike: (payload: PostLike) =>
      set(
        ({ feedCurrentPost }) =>
          feedCurrentPost && deletePostLike(feedCurrentPost, payload)
      ),
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
        if (feedPost) addComment(feedPost, payload)
      }),
    updateFeedPostComment: (payload: Comment) =>
      set(({ feedPosts }) => {
        const feedPost = feedPosts.find((post) => post.id === payload.postId)
        if (feedPost) updateComment(feedPost, payload)
      }),
    deleteFeedPostComment: (payload: Comment) =>
      set(({ feedPosts }) => {
        const feedPost = feedPosts.find((post) => post.id === payload.postId)
        if (feedPost) deleteComment(feedPost, payload)
      }),
  }))
)

const updatePost = (post: Post, payload: Post) => {
  post.body = payload.body
}

const addComment = (post: Post, payload: Comment) => {
  // Add count
  const _count = {
    ...(post._count ? post._count : { comments: 0 }),
  }
  _count.comments = (_count.comments || 0) + 1
  post._count = _count

  // Add comment
  if (!payload.parentCommentId) {
    if (!post.comments) post.comments = [payload]
    else if (post.comments) post.comments.unshift(payload)
  }

  // Subcomments => Obtain parent comment through .flat() and update?
  // if (feedPost && payload.parentCommentId) {
  //   if (feedPost.comments) {
  //     console.log(feedPost.comments.flat())
  //   }
  // }
}

const updateComment = (post: Post, payload: Comment) => {
  if (!payload.parentCommentId && post.comments) {
    const postCommentIdx = post.comments.findIndex(
      (comment) => comment.id === payload.id
    )
    post.comments.splice(postCommentIdx, 1, payload)
  }

  // Subcomments => Obtain parent comment through .flat() and update?
  // if (feedPost && payload.parentCommentId) {
  //   if (feedPost.comments) {
  //     console.log(feedPost.comments.flat())
  //   }
  // }
}

const deleteComment = (post: Post, payload: Comment) => {
  const _count = {
    ...(post._count ? post._count : { comments: 1 }),
  }
  _count.comments = (_count.comments || 1) - 1
  post._count = _count

  if (post.comments && !payload.parentCommentId) {
    const commentIdx = post.comments.indexOf(payload)
    post.comments.splice(commentIdx, 1)
  }

  // Subcomments => Obtain parent comment through .flat() and delete?
  // if (feedPost && payload.parentCommentId) {
  //   if (feedPost.comments) {
  //     console.log(feedPost.comments.flat())
  //   }
  // }
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
