import React from 'react'

import { MainButton } from '@ui/Buttons/MainButton'

interface Props {
  totalItems: number
  currentPage: number
  onPageChange: (pageNumber: number) => void
  maxPages?: number
  itemsPerPage?: number
}

const Pagination: React.FC<Props> = ({
  totalItems,
  currentPage,
  onPageChange,
  maxPages = 10,
  itemsPerPage = 10,
}) => {
  const pageNumbers = []
  const pageCount = Math.ceil(totalItems / itemsPerPage)
  const startIndex =
    totalItems > 100 ? 1 : Math.max(1, currentPage - Math.floor(maxPages / 2))
  const endIndex =
    totalItems > 100 ? 10 : Math.min(pageCount, startIndex + maxPages - 1)

  for (let i = startIndex; i <= endIndex; i++) {
    pageNumbers.push(i)
  }

  return (
    <section
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      {pageNumbers.map((page) => (
        <MainButton
          key={page}
          onClick={() => onPageChange(page)}
          disabled={currentPage === page}
          sizeVariant={'pagination'}
          style={{ margin: '2px' }}
        >
          {page}
        </MainButton>
      ))}
    </section>
  )
}

export default Pagination
