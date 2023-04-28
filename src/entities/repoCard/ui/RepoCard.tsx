import classNames from 'classnames/bind'
import React from 'react'

import { Repository } from '@api/repolist/types'
import { RepoDescription } from '@entities/repoCard/ui/RepoDescription'
import { RepoOwner } from '@ui/Repo/RepoOwner'

import styles from './repoCard.module.scss'

const cx = classNames.bind(styles)

interface Props {
  repository?: Repository
}

export const RepoCard: React.FC<Props> = ({ repository }) => {
  return (
    <section className={cx('card')}>
      <RepoOwner owner={repository?.owner} />
      <RepoDescription repository={repository} />
    </section>
  )
}
