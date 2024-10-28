'use client'

// components
import Link from 'next/link'
import { Card as CardShadCn } from '@/components/ui/card'
import { Card } from '@/components/primitives/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Typography } from '@/components/ui/typography'
import { UserEditButton } from '@/components/modules/buttons/user-edit-button'

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

interface UserCard {
  canEdit?: boolean
  githubRepositories: string[]
}

export const UserGithubRepositoriesCard: React.FC<UserCard> = ({
  canEdit,
  githubRepositories,
}) => {
  const { toast } = useToast()

  const [repositories, setRepositories] = useState<GetUserGithubReposRes>()

  useEffect(() => {
    const getRepos = async () => {
      const repositories = await getUserGithubRepos(githubRepositories)

      const failedRequestUrls: string[] = []

      repositories.forEach((repo) => {
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

      setRepositories(repositories)
    }
    if (githubRepositories.length) {
      getRepos()
    }
  }, [toast, githubRepositories])

  return (
    <Card className="flex flex-col gap-4 relative">
      {canEdit && <UserEditButton />}
      <div className="flex items-center gap-2">
        <Typography.H4>Github Repositories</Typography.H4>
        <GithubRainbow />
      </div>
      {/* No repositories in their profile */}
      {!githubRepositories.length && (
        <Typography.P>
          This user has not added any Github repositories to their profile.
        </Typography.P>
      )}
      {/* Repositories in profile but no response yet */}
      {githubRepositories.length && !repositories?.length && (
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
      {repositories && (
        <div className="flex flex-col sm:flex-row gap-4">
          {repositories.map((repository, i) => {
            if (!(repository as GetUserGithubRepoRes).status) {
              return null
            }
            const repositorySuccess = repository as GetUserGithubRepoRes
            return (
              <CardShadCn key={i} className="sm:basis-1/2">
                <Link
                  className="p-[18px] h-full w-full"
                  href={repositorySuccess.data.html_url}
                  target="_blank"
                >
                  <Typography.Muted className="font-bold">
                    {repositorySuccess.data.name}
                  </Typography.Muted>
                  {repositorySuccess.data.description && (
                    <Typography.Muted className="font">
                      {repositorySuccess.data.description}
                    </Typography.Muted>
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
  <Typography.Muted>
    <span className="block">Failed to fetch repositories from:</span>
    {failedRequestUrls?.map((url, i) => (
      <span key={i} className="block">
        {url}
      </span>
    ))}
    <span className="block">Please check the urls or try later.</span>
  </Typography.Muted>
)
