import moment from 'moment'
import React from 'react'

import { Repository } from '@api/repolist/types'
import { RepoDescriptionItem } from '@ui/Repo/RepoDescriptionItem'

interface Props {
  repository?: Repository
}
export const RepoDescription: React.FC<Props> = ({ repository }) => {
  const date = repository && new Date(repository.updatedAt)
  return (
    <>
      <RepoDescriptionItem
        title={'Last Commit:'}
        description={moment(date).format('MMMM d, YYYY')}
      />
      <RepoDescriptionItem
        title={'Languages:'}
        description={repository?.languages.edges.map((item) => (
          <>
            <span style={{ color: `var(--primary-color)` }}>&#8226;</span>{' '}
            {item.node.name}{' '}
          </>
        ))}
      />
      <RepoDescriptionItem
        title={'Description:'}
        description={repository?.description}
      />
      <RepoDescriptionItem
        title={'Stars:'}
        description={repository?.stargazerCount}
      />
    </>
  )
}
