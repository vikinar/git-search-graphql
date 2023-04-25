import classNames from 'classnames/bind'
import React, { ReactNode } from 'react'

import { concatPagination } from '@apollo/client/utilities'
import { Header } from '@ui/Layout/Header'

import styles from './baseLayout.module.scss'

const cx = classNames.bind(styles)
interface Props {
  headerChildren: ReactNode
  children: ReactNode
  pagination?: ReactNode
}
export const BaseLayout: React.FC<Props> = ({
  children,
  headerChildren,
  pagination,
}) => {
  return (
    <main className={cx('wrapper')}>
      <Header> {headerChildren} </Header>
      <section className={cx('container')}>{children}</section>
      <section className={cx('pagination')}>{pagination}</section>
    </main>
  )
}
