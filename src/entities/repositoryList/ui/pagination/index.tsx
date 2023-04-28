import React from 'react'

import { Repository } from '@api/repolist/types'
import { MainButton } from '@ui/Buttons/MainButton'
import Pagination from '@ui/Pagination'

interface Props {
  repositories: Repository[]
  userReposTotalCount: number
  totalCount: number
  handlePageChange: (page: number, user: boolean) => void
  currentPage: number
  userRepositories?: Repository[]
  userReposCurrentPage: number
  searchField?: string
}

export const RepoPagination: React.FC<Props> = ({
  repositories,
  userReposTotalCount,
  totalCount,
  handlePageChange,
  currentPage,
  userReposCurrentPage,
  userRepositories,
  searchField,
}) => {
  const ITEMS_PER_PAGE = 10

  const totalItems =
    !repositories.length || !searchField ? userReposTotalCount : totalCount

  const handlePaginationChange = (page: number) => {
    handlePageChange(page, !!repositories.length)
  }

  return (
    <>
      <Pagination
        totalItems={totalItems}
        currentPage={repositories.length ? currentPage : userReposCurrentPage}
        onPageChange={handlePaginationChange}
      />
    </>
  )
}
