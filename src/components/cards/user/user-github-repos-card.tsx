'use client'

// components
import Link from 'next/link'
import { Card as CardShadCn } from '@/components/ui/card'
import { Card } from '@/components/primitives/card'
import { NoContentCard } from '@/components/cards/no-content/no-content-card'
import { Skeleton } from '@/components/ui/skeleton'
import { UserEditCardButton } from '@/components/modules/buttons/user-edit-card-button'

// svg
import GithubRainbow from '/public/svg/github-rainbow.svg'

// utils
import { useState, useEffect } from 'react'
import { getUserGithubRepos } from '@/actions/user-actions'
import { useToast } from '@/hooks/use-toast'

// types
import {
  GetUserGithubReposRes,
  GetUserGithubRepoRes,
} from '@/types/server-types'
import { UserProfileCard } from '@/types/user-types'

/**
 * TODO
 * 
 * Collapsible content for more than 2 repos
 */

export const UserGithubReposCard: React.FC<UserProfileCard> = ({
  isEditable,
  user,
}) => {
  const { toast } = useToast()

  const [repos, setRepos] = useState<GetUserGithubReposRes>()

  useEffect(() => {
    const getRepos = async () => {
      const repos = await getUserGithubRepos(user.githubRepositories)

      const failedRequestUrls: string[] = []

      repos.forEach((repo) => {
        if (!(repo as GetUserGithubRepoRes).status) {
          failedRequestUrls.push(repo.url)
        }
      })

      if (failedRequestUrls?.length) {
        toast({
          title: 'Error!',
          description: (
            <ErrorDescription failedRequestUrls={failedRequestUrls} />
          ),
          variant: 'destructive',
        })
      }

      setRepos(repos)
    }

    if (user.githubRepositories.length) {
      getRepos()
    }
  }, [toast, user])

  if (!user.githubRepositories.length)
    return (
      <div className="relative">
        {isEditable && (
          <UserEditCardButton modalType="userGithubReposForm" user={user} />
        )}
        <NoContentCard
          className="text-left"
          heading="Github Repositories"
          subheading={`This user has not added any Github repositories to their profile.`}
        />
      </div>
    )

  return (
    <Card className="flex flex-col gap-4 relative">
      {isEditable && (
        <UserEditCardButton modalType="userGithubReposForm" user={user} />
      )}
      <div className="flex items-center gap-2">
        <p className="h4">Github Repositories</p>
        <GithubRainbow />
      </div>
      {/* Repositories in profile but no response yet */}
      {user.githubRepositories.length && !repos?.length && (
        <div className="flex gap-4">
          <CardShadCn className="sm:basis-1/2 p-[18px]">
            <Skeleton className="h-[40px] w-full" />
          </CardShadCn>
          <CardShadCn className="sm:basis-1/2 p-[18px]">
            <Skeleton className="h-[40px] w-full" />
          </CardShadCn>
        </div>
      )}
      {/* Repositories in profile and response */}
      {repos?.length && (
        <div className="flex flex-col sm:flex-row gap-4">
          {repos.map((repo, i) => {
            if (!(repo as GetUserGithubRepoRes).status) {
              return null
            }
            const repoSuccess = repo as GetUserGithubRepoRes
            return (
              <CardShadCn key={i} className="sm:basis-1/2">
                <Link
                  className="p-[18px] h-full w-full"
                  href={repoSuccess.data.html_url}
                  target="_blank"
                >
                  <p className="muted font-bold">{repoSuccess.data.name}</p>
                  {repoSuccess.data.description && (
                    <p className="muted">{repoSuccess.data.description}</p>
                  )}
                </Link>
              </CardShadCn>
            )
          })}
        </div>
      )}
    </Card>
  )
}

const ErrorDescription: React.FC<{ failedRequestUrls?: string[] }> = ({
  failedRequestUrls,
}) => (
  <p className="muted">
    <span className="block">Failed to fetch repositories from:</span>
    {failedRequestUrls?.map((url, i) => (
      <span key={i} className="block">
        {url}
      </span>
    ))}
    <span className="block">Please check the urls or try later.</span>
  </p>
)
