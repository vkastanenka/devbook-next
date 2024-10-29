'use client'

// components
import { PostCreatePostModal } from '@/components/modals/post/post-create-post-modal'
import { UserAboutFormModal } from '@/components/modals/user/user-about-form-modal'
import { UserContactInformationModal } from '@/components/modals/user/user-contact-information-modal'
import { UserEducationFormModal } from '@/components/modals/user/user-education-form-modal'
import { UserExperienceFormModal } from '@/components/modals/user/user-experience-form-modal'
import { UserFormModal } from '@/components/modals/user/user-form-modal'
import { UserGithubReposFormModal } from '@/components/modals/user/user-github-repos-form-modal'
import { UserSkillsFormModal } from '@/components/modals/user/user-skills-form-modal'
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
      <UserAboutFormModal />
      <UserContactInformationModal />
      <UserEducationFormModal />
      <UserExperienceFormModal />
      <UserFormModal />
      <UserGithubReposFormModal />
      <UserSkillsFormModal />
      <UserSkillsModal />
    </>
  )
}
