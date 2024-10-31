'use client'

// components
import Link from 'next/link'
import { Card } from '@/components/ui/card'
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
import { CollapsibleContent } from '../../modules/collapsible-content'

/**
 * TODO
 * 
 * Figure out why deleting last repo will still keep 1 card
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

  return (
    <Card className="card flex flex-col gap-4 relative">
      {isEditable && (
        <UserEditCardButton modalType="userGithubReposForm" user={user} />
      )}
      <div className="flex items-center gap-2">
        <p className="h4">Github Repositories</p>
        <GithubRainbow />
      </div>
      {user.githubRepositories.length === 0 && (
        <p className="p">{`This user hasn't provided any Github repositories.`}</p>
      )}
      <CollapsibleContent includeTrigger={user.githubRepositories.length > 4}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Repositories in profile but no response yet */}
          {user.githubRepositories.length > 0 &&
            !repos?.length &&
            user.githubRepositories.map((repo) => (
              <Card key={repo} className="col-span-2 sm:col-span-1 p-[18px]">
                <Skeleton className="h-[40px] w-full" />
              </Card>
            ))}

          {/* Repositories in profile and response */}
          {repos?.length &&
            repos.map((repo, i) => {
              if (!(repo as GetUserGithubRepoRes).status) {
                return null
              }
              const repoSuccess = repo as GetUserGithubRepoRes
              return (
                <Card key={i} className="col-span-2 sm:col-span-1">
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
                </Card>
              )
            })}
        </div>
      </CollapsibleContent>
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
