import classNames from 'classnames/bind'
import moment from 'moment/moment'
import React from 'react'

import { Repository } from '@api/repolist/types'
import { Text, Title } from '@ui/Typography'

import styles from './repoCard.module.scss'

const cx = classNames.bind(styles)

interface Props {
  repository?: Repository
}
export const RepoCard: React.FC<Props> = ({ repository }) => {
  const date = repository && new Date(repository.updatedAt)
  return (
    <section className={cx('card')}>
      <section style={{ display: 'flex', alignItems: 'center' }}>
        <img
          style={{
            width: '100px',
            border: `2px solid var(--primary-color)`,
            borderRadius: '100px',
            margin: '10px 15px 10px 0',
          }}
          src={repository?.owner.avatarUrl}
          alt={repository?.owner.login}
        />
        <section>
          <Title
            size={'medium'}
            style={{ color: `var(--primary-color)`, margin: 0 }}
          >
            {repository?.owner.login}
          </Title>
          <Text size={'small-text'} style={{ color: `var(--primary-color)` }}>
            <a href={repository?.owner.url}>{repository?.owner.url}</a>
          </Text>
        </section>
      </section>
      <Text style={{ color: `var(--primary-color)` }} weight={'bold'}>
        Last commit:
      </Text>
      <Text>{moment(date).format('MMMM d, YYYY')}</Text>
      <Text style={{ color: `var(--primary-color)` }} weight={'bold'}>
        Languages:{' '}
      </Text>
      <Text>
        {repository?.languages.edges.map((item) => (
          <>
            <span style={{ color: `var(--primary-color)` }}>&#8226;</span>{' '}
            {item.node.name}{' '}
          </>
        ))}
      </Text>
      <Text style={{ color: `var(--primary-color)` }} weight={'bold'}>
        Description:
      </Text>
      <Text>{repository?.description}</Text>
      <Text style={{ color: `var(--primary-color)` }} weight={'bold'}>
        Stars:
      </Text>
      <Text>{repository?.stargazerCount}</Text>
      {repository?.forkCount && (
        <Text>Fork count: {repository?.forkCount}</Text>
      )}
    </section>
  )
}
