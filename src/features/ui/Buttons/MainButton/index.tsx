import { RefObject, forwardRef } from 'react'

import { BaseButton } from '@ui/Buttons/BaseButton'
import { IBaseButtonProps } from '@ui/Buttons/BaseButton/interfaces'

export const MainButton = forwardRef(
  (
    {
      children,
      onClick,
      style,
      fill,
      sizeVariant,
      variant,
      disabled,
    }: IBaseButtonProps,
    ref
  ) => {
    return (
      <BaseButton
        style={style}
        fill={fill || 'full-filled'}
        ref={ref as RefObject<HTMLButtonElement>}
        sizeVariant={sizeVariant || 'large'}
        variant={variant || 'flat'}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </BaseButton>
    )
  }
)
