'use client'

// components
import { PostCreatePostModal } from '@/components/modals/post/post-create-post-modal'
import { UserContactInformationModal } from '@/components/modals/user/user-contact-information-modal'
import { UserSkillsModal } from '@/components/modals/user/user-skills-modal'

// utils
import { useEffect, useState } from 'react'

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      <PostCreatePostModal />
      <UserContactInformationModal />
      <UserSkillsModal />
    </>
  )
}
