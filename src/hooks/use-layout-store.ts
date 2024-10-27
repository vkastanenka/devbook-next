// utils
import { create } from 'zustand'

// types
import { User } from '@/types/user-types'

interface LayoutStore {
  searchDevbookInputRef: React.RefObject<HTMLInputElement> | null
  setSearchDevbookInputRef: (
    value: React.RefObject<HTMLInputElement> | null
  ) => void
  searchDevbookInputValue: string
  setSearchDevbookInputValue: (value: string) => void
  searchDevbookResults: User[] | null
  setSearchDevbookResults: (value: User[] | null) => void
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
}))
