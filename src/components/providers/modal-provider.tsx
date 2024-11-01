'use client'

// components
import { PostCommentFormModal } from '@/components/modals/post/post-comment-form-modal'
import { PostCommentsModal } from '@/components/modals/post/post-comments-modal'
import { PostFormModal } from '@/components/modals/post/post-form-modal'
import { UserBioFormModal } from '@/components/modals/user/user-bio-form-modal'
import { UserContactsModal } from '@/components/modals/user/user-contacts-modal'
import { UserContactInformationModal } from '@/components/modals/user/user-contact-information-modal'
import { UserEducationsFormModal } from '@/components/modals/user/user-educations-form-modal'
import { UserExperiencesFormModal } from '@/components/modals/user/user-experiences-form-modal'
import { UserDetailsFormModal } from '@/components/modals/user/user-details-form-modal'
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
      <PostCommentFormModal />
      <PostCommentsModal />
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
