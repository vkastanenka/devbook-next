// utils
import { create } from 'zustand'

// types
import { User } from '@vkastanenka/devbook-types/dist/user'

interface LayoutStore {
  searchDevbookInputRef: React.RefObject<HTMLInputElement> | null
  setSearchDevbookInputRef: (
    value: React.RefObject<HTMLInputElement> | null
  ) => void
  searchDevbookInputValue: string
  setSearchDevbookInputValue: (value: string) => void
  searchDevbookResults: User[] | null
  setSearchDevbookResults: (value: User[] | null) => void
  searchDevbookFormIsSubmitting: boolean | undefined
  setSearchDevbookFormIsSubmitting: (value: boolean | undefined) => void
}

export const useLayoutStore = create<LayoutStore>((set) => ({
  searchDevbookInputRef: null,
  setSearchDevbookInputRef: (value: React.RefObject<HTMLInputElement> | null) =>
    set({ searchDevbookInputRef: value }),
  searchDevbookInputValue: '',
  setSearchDevbookInputValue: (value = '') =>
    set({ searchDevbookInputValue: value }),
  searchDevbookResults: null,
  setSearchDevbookResults: (value: User[] | null) =>
    set({ searchDevbookResults: value }),
  searchDevbookFormIsSubmitting: undefined,
  setSearchDevbookFormIsSubmitting: (value: boolean | undefined) =>
    set({ searchDevbookFormIsSubmitting: value }),
}))
