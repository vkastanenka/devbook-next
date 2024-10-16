'use client'

// components
import { CreatePostModal } from '@/components/modals/create-post-modal'

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
      <CreatePostModal />
    </>
  )
}
