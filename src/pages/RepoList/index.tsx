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

  const memoPage = parseInt(sessionStorage.getItem('page') as string)
  const memoSearchField = sessionStorage.getItem('searchField')

  useEffect(() => {
    if (!searchTerm) {
      dispatch(setUserCurrentPage(1))
      dispatch(fetchUserRepositories({ currentPage: 1 }))
    }
  }, [dispatch, searchTerm])

  useEffect(() => {
    if (debouncedSearchValue && (!memoSearchField || !memoPage)) {
      dispatch(setSearchQuery(debouncedSearchValue))
      dispatch(setCurrentPage(1))
      dispatch(
        fetchRepositories({ searchQuery: debouncedSearchValue, currentPage: 1 })
      )
    } else if (!debouncedSearchValue && (memoSearchField || memoPage)) {
      dispatch(setSearchQuery(memoSearchField))
      dispatch(setCurrentPage(memoPage))
      dispatch(
        fetchRepositories({
          searchQuery: memoSearchField as string,
          currentPage: memoPage,
        })
      )
    }
  }, [debouncedSearchValue, memoSearchField, memoPage])
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    sessionStorage.setItem('searchField', `${e.target.value}`)
  }

  const handlePageChange = (page: number, user: boolean) => {
    sessionStorage.setItem('page', `${page}`)
    console.log(currentPage)
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
          value={searchTerm || (memoSearchField as string)}
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
          <Pagination
            handlePageChange={handlePageChange}
            currentPage={memoPage || currentPage}
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
