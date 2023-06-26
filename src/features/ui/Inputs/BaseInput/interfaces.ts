import { CSSProperties, ChangeEventHandler, RefObject, HTMLProps } from 'react'

export interface IBaseInputProps extends Omit<HTMLProps<HTMLInputElement>, 'ref'> {
  onChange?: ChangeEventHandler<HTMLInputElement>
  type: 'text' | 'password' | 'search' | 'url'
  autofocus?: boolean
  ref?: RefObject<HTMLInputElement>
  hasError?: boolean
  variant: 'rounded' | 'base'
  autocomplete?: 'on' | 'off'
}
