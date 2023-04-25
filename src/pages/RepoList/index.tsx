import React, { ChangeEvent, useEffect, useState } from 'react'

import { Repository } from '@api/repolist/search/types'
import {
  fetchUserRepositories,
  setUserCurrentPage,
} from '@entities/repositoryList/models/me'
import {
  fetchRepositories,
  setCurrentPage,
  setSearchQuery,
} from '@entities/repositoryList/models/search'
import ListItemCard from '@entities/repositoryList/ui/listItem'
import { Pagination } from '@entities/repositoryList/ui/pagination'
import { useAppDispatch, useAppSelector } from '@features/hooks/store'
import useDebounce from '@features/hooks/useDebounce'
import { RootState } from '@src/app/store'
import { BaseInput } from '@ui/Inputs/BaseInput'
import { BaseLayout } from '@ui/Layout/BaseLayout'

const RepositoryList: React.FC = () => {
  const dispatch = useAppDispatch()
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchValue = useDebounce<string>(searchTerm, 500)

  const {
    repositories,
    isLoading,
    error,
    searchQuery,
    currentPage,
    hasNextPage,
    totalCount,
  } = useAppSelector((state: RootState) => state.repositories)

  const {
    repositories: userRepositories,
    isLoading: userReposIsLoading,
    error: userReposError,
    currentPage: userReposCurrentPage,
    hasNextPage: userReposHasNextPage,
    totalCount: userReposTotalCount,
  } = useAppSelector((state: RootState) => state.userRepositories)

  useEffect(() => {
    dispatch(setUserCurrentPage(1))
    dispatch(fetchUserRepositories({ currentPage: 1 }))
  }, [dispatch])

  useEffect(() => {
    if (debouncedSearchValue) {
      dispatch(setSearchQuery(debouncedSearchValue))
      dispatch(setCurrentPage(1))
      dispatch(
        fetchRepositories({ searchQuery: debouncedSearchValue, currentPage: 1 })
      )
    }
  }, [debouncedSearchValue])
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handlePageChange = (page: number, user: boolean) => {
    !user ? dispatch(setCurrentPage(page)) : dispatch(setUserCurrentPage(page))
    !user
      ? dispatch(fetchRepositories({ searchQuery, currentPage: page }))
      : dispatch(fetchUserRepositories({ currentPage: page }))
  }

  return (
    <BaseLayout
      headerChildren={
        <BaseInput
          type="search"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e)}
          id={'search'}
          variant={'rounded'}
          placeholder={'Find repository...'}
        />
      }
      pagination={
        (hasNextPage || userReposHasNextPage) &&
        !isLoading &&
        !userReposIsLoading && (
          <Pagination
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            repositories={repositories}
            userRepositories={userRepositories}
            userReposCurrentPage={userReposCurrentPage}
            totalCount={totalCount}
            userReposTotalCount={userReposTotalCount}
          />
        )
      }
    >
      {(userReposIsLoading || isLoading) && <div>Loading...</div>}
      {(userReposError || error) && <div>Error</div>}

      {!isLoading &&
        !userReposIsLoading &&
        !repositories.length &&
        userRepositories?.map((repo: Repository) => (
          <ListItemCard key={repo.id} repo={repo} />
        ))}
      {!isLoading &&
        repositories?.map((repo: Repository) => (
          <ListItemCard key={repo.id} repo={repo} />
        ))}
    </BaseLayout>
  )
}

export default RepositoryList
