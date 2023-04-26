import React, { useMemo } from 'react'

import { Repository } from '@api/repolist/types'
import { MainButton } from '@ui/Buttons/MainButton'

interface Props {
  repositories: Repository[]
  userReposTotalCount: number
  totalCount: number
  handlePageChange: (page: number, user: boolean) => void
  currentPage: number
  userRepositories?: Repository[]
  userReposCurrentPage: number
}
export const Pagination: React.FC<Props> = ({
  repositories,
  userReposTotalCount,
  totalCount,
  handlePageChange,
  currentPage,
  userReposCurrentPage,
}) => {
  const ITEMS_PER_PAGE = 10

  const pageNumbers = useMemo(() => {
    let pageCount: number
    if (!repositories.length) {
      pageCount =
        userReposTotalCount > 100
          ? Math.ceil(100 / ITEMS_PER_PAGE)
          : Math.ceil(userReposTotalCount / ITEMS_PER_PAGE)
    } else {
      pageCount =
        totalCount > 100
          ? Math.ceil(100 / ITEMS_PER_PAGE)
          : Math.ceil(totalCount / ITEMS_PER_PAGE)
    }
    const pageNumbers = []

    for (let i = 1; i <= pageCount && i <= 10; i++) {
      pageNumbers.push(i)
    }
    return pageNumbers
  }, [totalCount, userReposTotalCount, repositories])
  return (
    <>
      {pageNumbers.map((page) => (
        <MainButton
          sizeVariant={'pagination'}
          key={page}
          onClick={() => handlePageChange(page, !repositories.length)}
          disabled={
            (repositories.length && currentPage === page) ||
            (!repositories.length && userReposCurrentPage === page)
          }
          style={{ margin: '0 2px' }}
        >
          {page}
        </MainButton>
      ))}
    </>
  )
}
