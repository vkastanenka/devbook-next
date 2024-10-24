'use client'

// components
import Link from 'next/link'
import { Card as CardShadCn } from '@/components/ui/card'
import { Card } from '@/components/primitives/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Typography } from '@/components/ui/typography'

// svg
import GithubRainbow from '/public/svg/github-rainbow.svg'

// utils
import { useState, useEffect } from 'react'
import { getUserGithubRepositories } from '@/src/lib/actions/user'
import {
  GetUserGithubRepositoriesResponse,
  GetUserGithubRepositoryResponse,
} from '@/src/lib/types'

interface UserCard {
  githubRepositories: string[]
}

export const UserGithubRepositoriesCard: React.FC<UserCard> = ({
  githubRepositories,
}) => {
  const [repositories, setRepositories] =
    useState<GetUserGithubRepositoriesResponse>()

  useEffect(() => {
    const getRepos = async () => {
      const repositories = await getUserGithubRepositories(githubRepositories)
      setRepositories(repositories)
    }
    if (githubRepositories.length) {
      getRepos()
    }
  }, [githubRepositories])

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Typography.H4>Github Repositories</Typography.H4>
        <GithubRainbow />
      </div>
      {!githubRepositories.length && (
        <Typography.P>
          This user has not added any Github repositories to their profile.
        </Typography.P>
      )}
      {githubRepositories.length && !repositories?.length && (
        <div className="flex gap-4">
          <CardShadCn className="basis-1/2 p-[18px]">
            <Skeleton className="h-[40px] w-full" />
          </CardShadCn>
          <CardShadCn className="basis-1/2 p-[18px]">
            <Skeleton className="h-[40px] w-full" />
          </CardShadCn>
        </div>
      )}
      <div className="flex gap-4">
        {repositories &&
          repositories.map((repository, i) => {
            // if (!(repository as { url: string; success: boolean }).success) {
            //   return null // TODO: Proper error handling
            // }
            const repositorySuccess =
              repository as GetUserGithubRepositoryResponse
            return (
              <CardShadCn key={i} className="basis-1/2">
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
    </Card>
  )
}
