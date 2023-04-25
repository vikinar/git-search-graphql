import { CSSProperties, ChangeEventHandler, RefObject } from 'react'

export interface IBaseInputProps {
  value?: string
  type: 'text' | 'password' | 'search' | 'url'
  id: string
  placeholder?: string
  autofocus?: boolean
  style?: CSSProperties
  onBlur?: ChangeEventHandler<HTMLInputElement>
  onChange?: ChangeEventHandler<HTMLInputElement>
  disabled?: boolean
  ref?: RefObject<HTMLInputElement>
  hasError?: boolean
  variant: 'rounded' | 'base'
}
