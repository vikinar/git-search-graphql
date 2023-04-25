import { CSSProperties, MouseEventHandler, ReactNode, RefObject } from 'react'

type SizeVariant = 'small' | 'medium' | 'large' | 'pagination'

export interface IBaseButtonProps {
  fill?: 'outlined' | 'full-filled'
  variant?: 'flat' | 'rounded'
  sizeVariant?: SizeVariant
  children?: ReactNode
  style?: CSSProperties
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  ref: RefObject<HTMLButtonElement>
}
