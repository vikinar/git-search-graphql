import classNames from 'classnames/bind'
import React, { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

import { Repository } from '@api/repolist/types'
import { MainButton } from '@ui/Buttons/MainButton'
import { Text, Title } from '@ui/Typography'

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
      <Text>Description: {repo.description}</Text>
      <Text>Stars: {repo.stargazerCount}</Text>
      <Text>Forks: {repo.forkCount}</Text>
      <Text>Owner: {repo.owner.login}</Text>
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
