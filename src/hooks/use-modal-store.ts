// utils
import { create } from 'zustand'

// types
import { Post } from '@/types/post-types'
import { User } from '@/types/user-types'

export type ModalType =
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
  placeholder?: string
  post?: Post
  user?: User
}

interface ModalStore {
  type: ModalType | null
  data: ModalData
  isOpen: boolean
  onOpen: (type: ModalType, data?: ModalData) => void
  onClose: () => void
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null, data: {} }),
}))
