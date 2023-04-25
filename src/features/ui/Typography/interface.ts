import { CSSProperties, ReactNode } from 'react'

export type ITitleProps = {
  size?: 'large' | 'medium' | 'small'
  weight?: 'regular' | 'medium' | 'bold'
  children: ReactNode
  style?: CSSProperties
}

export type ITextProps = {
  size?: 'large-text' | 'medium-text' | 'small-text'
  weight?: 'regular' | 'medium' | 'bold'
  children: ReactNode
  style?: CSSProperties
}
