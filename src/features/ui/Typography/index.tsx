import classNames from 'classnames/bind'
import React from 'react'

import { ITextProps, ITitleProps } from '@ui/Typography/interface'

import styles from './typography.module.scss'

const cx = classNames.bind(styles)

export const Title: React.FC<ITitleProps> = ({
  children,
  size,
  weight,
  style,
}) => {
  return (
    <>
      {(size === 'large' && (
        <h1 className={cx([size, weight])} style={style}>
          {children}
        </h1>
      )) ||
        (size === 'medium' && (
          <h2 className={cx([size, weight])} style={style}>
            {children}
          </h2>
        )) ||
        (size === 'small' && (
          <h3 className={cx([size, weight])} style={style}>
            {children}
          </h3>
        ))}
    </>
  )
}

export const Text: React.FC<ITextProps> = ({
  children,
  size,
  weight,
  style,
}) => {
  return (
    <>
      {(size === 'large-text' && (
        <p className={cx([size, weight])} style={style}>
          {children}
        </p>
      )) ||
        (size === 'medium-text' && (
          <p className={cx([size, weight])} style={style}>
            {children}
          </p>
        )) ||
        ((size === 'small-text' || !size) && (
          <p className={cx([size || 'small-text', weight])} style={style}>
            {children}
          </p>
        ))}
    </>
  )
}
