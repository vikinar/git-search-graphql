import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { fetchRepository } from '@entities/repoCard/models/repository'
import { RepoCard } from '@entities/repoCard/ui/RepoCard'
import { useAppDispatch, useAppSelector } from '@features/hooks/store'
import { RootState } from '@src/app/store'
import { BaseLayout } from '@ui/Layout/BaseLayout'
import { Title } from '@ui/Typography'

const RepoDetails: React.FC = () => {
  const location = useLocation()
  const { owner, name } = location.state

  const dispatch = useAppDispatch()

  const { repository, isLoading, error } = useAppSelector(
    (state: RootState) => state.repository
  )

  useEffect(() => {
    dispatch(fetchRepository({ owner, name }))
  }, [dispatch, name, owner])

  return (
    <BaseLayout
      headerChildren={
        <Title style={{ color: 'white' }} size={'large'}>
          {repository?.name}
        </Title>
      }
    >
      {isLoading && 'Loading...'}
      {!isLoading && <RepoCard repository={repository} key={repository?.id} />}
    </BaseLayout>
  )
}

export default RepoDetails
