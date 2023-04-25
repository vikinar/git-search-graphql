import classNames from 'classnames/bind'
import { forwardRef } from 'react'

import styles from './baseInput.module.scss'
import { IBaseInputProps } from './interfaces'

const cx = classNames.bind(styles)

export const BaseInput = forwardRef<HTMLInputElement, IBaseInputProps>(
  (
    {
      value,
      type,
      id,
      placeholder = '',
      disabled = false,
      autofocus,
      style,
      hasError,
      variant,
      onChange,
      onBlur,
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        className={cx(variant)}
        style={{
          ...style,
          borderColor: hasError ? 'var(--danger-color)' : '',
        }}
        placeholder={placeholder}
        value={value}
        type={type}
        disabled={disabled}
        autoFocus={autofocus}
        id={id}
        onChange={onChange}
        onBlur={onBlur}
      />
    )
  }
)
