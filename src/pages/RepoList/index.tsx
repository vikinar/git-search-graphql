import React, { ChangeEvent, useEffect, useState } from 'react'

import { Repository } from '@api/repolist/types'
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
import { RepoPagination } from '@entities/repositoryList/ui/pagination'
import { useAppDispatch, useAppSelector } from '@features/hooks/store'
import useDebounce from '@features/hooks/useDebounce'
import { RootState } from '@src/app/store'
import { BaseInput } from '@ui/Inputs/BaseInput'
import { BaseLayout } from '@ui/Layout/BaseLayout'

const RepositoryList: React.FC = () => {
  const dispatch = useAppDispatch()

  const {
    repositories,
    isLoading,
    error,
    searchQuery,
    currentPage,
    totalCount,
  } = useAppSelector((state: RootState) => state.repositories)
  const [searchTerm, setSearchTerm] = useState(searchQuery || '')
  const debouncedSearchValue = useDebounce<string>(searchTerm, 500)

  const {
    repositories: userRepositories,
    isLoading: userReposIsLoading,
    error: userReposError,
    currentPage: userReposCurrentPage,
    totalCount: userReposTotalCount,
  } = useAppSelector((state: RootState) => state.userRepositories)

  useEffect(() => {
    if (!debouncedSearchValue.length) {
      dispatch(setSearchQuery(''))
      dispatch(setUserCurrentPage(1))
      dispatch(fetchUserRepositories({ currentPage: 1 }))
    }
  }, [dispatch, debouncedSearchValue])

  useEffect(() => {
    if (debouncedSearchValue) {
      dispatch(setSearchQuery(debouncedSearchValue || searchQuery))
      dispatch(setCurrentPage(currentPage || 1))
      dispatch(
        fetchRepositories({
          searchQuery: debouncedSearchValue || searchQuery,
          currentPage: currentPage || 1,
        })
      )
    }
  }, [debouncedSearchValue])
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    dispatch(setCurrentPage(1))
  }

  const handlePageChange = (page: number, user: boolean) => {
    user ? dispatch(setCurrentPage(page)) : dispatch(setUserCurrentPage(page))
    user
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
          autocomplete={'on'}
        />
      }
      pagination={
        !isLoading &&
        !userReposIsLoading && (
          <RepoPagination
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            repositories={repositories}
            userRepositories={userRepositories}
            userReposCurrentPage={userReposCurrentPage}
            totalCount={totalCount}
            userReposTotalCount={userReposTotalCount}
            searchField={searchTerm}
          />
        )
      }
    >
      {(userReposIsLoading || isLoading) && <div>Loading...</div>}
      {(userReposError || error) && <div>Error</div>}

      {!isLoading &&
        !userReposIsLoading &&
        (!searchTerm.length || !debouncedSearchValue.length) &&
        userRepositories?.map((repo: Repository) => (
          <ListItemCard key={repo.id} repo={repo} />
        ))}
      {!isLoading &&
        !!repositories.length &&
        !!debouncedSearchValue &&
        repositories?.map((repo: Repository) => (
          <ListItemCard key={repo.id} repo={repo} />
        ))}
    </BaseLayout>
  )
}

export default RepositoryList
