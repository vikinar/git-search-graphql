import classNames from 'classnames/bind'
import { forwardRef } from 'react'

import { IBaseButtonProps } from '@ui/Buttons/BaseButton/interfaces'

import styles from './baseInput.module.scss'

const cx = classNames.bind(styles)
export const BaseButton = forwardRef<HTMLButtonElement, IBaseButtonProps>(
  ({ sizeVariant, style, fill, variant, children, onClick, disabled }, ref) => {
    return (
      <button
        className={cx(['btn', fill, sizeVariant, variant])}
        style={style}
        ref={ref}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    )
  }
)
