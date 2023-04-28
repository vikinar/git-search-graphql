import classNames from 'classnames/bind'
import React from 'react'

import styles from '@entities/repoCard/ui/repoCard.module.scss'
import { Text, Title } from '@ui/Typography'

interface Owner {
  avatarUrl: string
  login: string
  url: string
}
interface RepoOwnerProps {
  owner?: Owner
}

const cx = classNames.bind(styles)
export const RepoOwner: React.FC<RepoOwnerProps> = ({ owner }) => {
  return (
    <section className={cx('owner')}>
      <img
        className={cx('owner_img')}
        src={owner?.avatarUrl}
        alt={owner?.login}
      />
      <section>
        <Title
          size={'medium'}
          style={{ color: `var(--primary-color)`, margin: 0 }}
        >
          {owner?.login}
        </Title>
        <Text size={'small-text'} style={{ color: `var(--primary-color)` }}>
          <a href={owner?.url}>{owner?.url}</a>
        </Text>
      </section>
    </section>
  )
}
