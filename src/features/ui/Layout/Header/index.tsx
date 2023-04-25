import classNames from 'classnames/bind'
import React, { ReactNode } from 'react'

import styles from './header.module.scss'

const cx = classNames.bind(styles)
interface Props {
  children?: ReactNode
}

export const Header: React.FC<Props> = ({ children }) => {
  return (
    <section className={cx('wrapper')}>
      <section className={cx('container')}>{children}</section>
    </section>
  )
}
