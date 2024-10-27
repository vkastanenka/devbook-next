export enum PostType {
  DEFAULT,
  EVENT,
  ARTICLE,
}

export interface Post {
  id: string
  body: string
  postType: PostType
  // user
  // userId
  createdAt: Date
  updatedAt: Date
  // attachments
  // postComments
  // postLikes
}
