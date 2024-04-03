import { CSSProperties, HTMLProps, ReactNode, RefObject } from 'react'

type SizeVariant = 'small' | 'medium' | 'large' | 'pagination'

export interface IBaseButtonProps extends HTMLProps<HTMLButtonElement> {
  fill?: 'outlined' | 'full-filled'
  variant?: 'flat' | 'rounded'
  sizeVariant?: SizeVariant
  children?: ReactNode
  style?: CSSProperties
  ref?: RefObject<HTMLButtonElement>
}
