'use client'

// actions
import { userReadCurrentUserGithubRepos } from '@/src/actions/user-actions'

// components
import Link from 'next/link'
import { Card } from '@/src/components/ui/card'
import { CollapsibleContent } from '@/src/components/ui/collapsible-content'
import { Skeleton } from '@/src/components/ui/skeleton'
import { UserEditProfileCardButton } from '@/src/components/buttons/user/user-edit-profile-card-button'

// svg
import GithubRainbow from '/public/svg/github-rainbow.svg'

// utils
import { useState, useEffect } from 'react'
import { useToast } from '@/src/hooks/use-toast'

// types
import { ReadGithubRepoServerResponse } from '@/src/types/server-types'
import { User } from '@/src/types/user-types'

interface UserGithubReposCard {
  isCurrentUser?: boolean
  isEditable?: boolean
  user: User
}

export const UserGithubReposCard: React.FC<UserGithubReposCard> = ({
  isCurrentUser,
  isEditable,
  user,
}) => {
  const { toast } = useToast()

  const [repos, setRepos] = useState<ReadGithubRepoServerResponse[]>()

  useEffect(() => {
    const getRepos = async () => {
      const repos = await userReadCurrentUserGithubRepos(user.githubRepos)

      const failedRequestUrls: string[] = []

      repos.forEach((repo) => {
        if ((repo as ReadGithubRepoServerResponse).status !== 200) {
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

    if (user.githubRepos.length) {
      getRepos()
    }
  }, [toast, user])

  return (
    <Card className="card flex flex-col gap-4 relative">
      {isCurrentUser && isEditable && (
        <UserEditProfileCardButton
          modalType="userGithubReposForm"
          user={user}
        />
      )}
      <div className="flex items-center gap-2">
        <p className="h4">Github Repositories</p>
        <GithubRainbow />
      </div>
      {user.githubRepos.length > 0 ? (
        <CollapsibleContent includeTrigger={user.githubRepos.length > 4}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {repos?.length
              ? repos.map((repo, i) => {
                  // Repositories in profile and response
                  const repoSuccess = repo as ReadGithubRepoServerResponse
                  if (!repoSuccess.data) return null
                  return (
                    <Card key={i} className="p-2 col-span-2 sm:col-span-1">
                      <Link
                        className="p-2 button-text block h-full"
                        href={repoSuccess.data.html_url}
                        target="_blank"
                      >
                        <p className="muted font-bold">
                          {repoSuccess.data.name}
                        </p>
                        {repoSuccess.data.description && (
                          <p className="muted">
                            {repoSuccess.data.description}
                          </p>
                        )}
                      </Link>
                    </Card>
                  )
                })
              : user.githubRepos.map((repo) => (
                  // Repositories in profile but no response yet
                  <Card
                    key={repo}
                    className="col-span-2 sm:col-span-1 p-[18px]"
                  >
                    <Skeleton className="h-[40px] w-full" />
                  </Card>
                ))}
          </div>
        </CollapsibleContent>
      ) : (
        <p className="p">{`This user hasn't provided any Github repositories.`}</p>
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
