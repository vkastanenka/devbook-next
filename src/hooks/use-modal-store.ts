// utils
import { create } from 'zustand'

// types
import { Comment, Post } from '@vkastanenka/devbook-types/dist/post'
import { User } from '@vkastanenka/devbook-types/dist/user'

export type ModalType =
  | 'postCommentForm'
  | 'post'
  | 'postForm'
  | 'userBioForm'
  | 'userContactInformation'
  | 'userContacts'
  | 'userDetailsForm'
  | 'userEducationForm'
  | 'userExperienceForm'
  | 'userGithubReposForm'
  | 'userSkills'
  | 'userSkillsForm'

interface ModalData {
  comment?: Comment
  parentComment?: Comment
  post?: Post
  user?: User
}

interface ModalStore {
  type: ModalType | null
  data: ModalData
  isOpen: boolean
  onOpen: (type: ModalType, data?: ModalData) => void
  onClose: () => void
  setData: (data?: ModalData) => void
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null, data: {} }),
  setData: (data = {}) => set({ data }),
}))
