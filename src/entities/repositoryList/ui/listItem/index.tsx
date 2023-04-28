import classNames from 'classnames/bind'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Repository } from '@api/repolist/types'
import { MainButton } from '@ui/Buttons/MainButton'
import { RepoDescriptionItem } from '@ui/Repo/RepoDescriptionItem'
import { Title } from '@ui/Typography'

import styles from './listItem.module.scss'

const cx = classNames.bind(styles)

interface Props {
  repo: Repository
}
const ListItemCard: React.FC<Props> = ({ repo }) => {
  const navigate = useNavigate()
  return (
    <section key={repo.id} className={cx('card')}>
      <Title style={{ color: `var(--primary-color)` }} size={'medium'}>
        {repo.name}
      </Title>
      <RepoDescriptionItem
        title={`Description`}
        description={repo.description}
      />
      <section style={{ display: 'flex' }}>
        <RepoDescriptionItem
          title={'Stars:'}
          description={repo.stargazerCount}
          flex={true}
        />
        <RepoDescriptionItem
          title={'Forks:'}
          description={repo.forkCount}
          flex={true}
        />
        <RepoDescriptionItem
          title={`Owner:`}
          description={repo.owner.login}
          flex={true}
        />
      </section>
      <MainButton
        sizeVariant={'large'}
        variant={'rounded'}
        fill={'full-filled'}
        onClick={() =>
          navigate(`${repo.id}`, {
            state: { owner: repo.owner.login, name: repo.name },
          })
        }
        style={{
          display: 'flex',
          alignSelf: 'flex-end',
          margin: '15px 0',
        }}
      >
        View
      </MainButton>
    </section>
  )
}

export default ListItemCard
