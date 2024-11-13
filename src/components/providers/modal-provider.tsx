'use client'

// components
import { PostCommentFormModal } from '@/src/components/modals/post/post-comment-form-modal'
import { PostFormModal } from '@/src/components/modals/post/post-form-modal'
import { UserBioFormModal } from '@/src/components/modals/user/user-bio-form-modal'
import { UserContactsModal } from '@/src/components/modals/user/user-contacts-modal'
import { UserContactInformationModal } from '@/src/components/modals/user/user-contact-information-modal'
import { UserEducationsFormModal } from '@/src/components/modals/user/user-educations-form-modal'
import { UserExperiencesFormModal } from '@/src/components/modals/user/user-experiences-form-modal'
import { UserDetailsFormModal } from '@/src/components/modals/user/user-details-form-modal'
import { UserGithubReposFormModal } from '@/src/components/modals/user/user-github-repos-form-modal'
import { UserSkillsFormModal } from '@/src/components/modals/user/user-skills-form-modal'
import { UserSkillsModal } from '@/src/components/modals/user/user-skills-modal'

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
      <PostCommentFormModal />
      <PostFormModal />
      <UserBioFormModal />
      <UserContactsModal />
      <UserContactInformationModal />
      <UserEducationsFormModal />
      <UserExperiencesFormModal />
      <UserDetailsFormModal />
      <UserGithubReposFormModal />
      <UserSkillsFormModal />
      <UserSkillsModal />
    </>
  )
}
