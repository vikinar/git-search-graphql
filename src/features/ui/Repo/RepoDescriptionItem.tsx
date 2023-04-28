import React, { CSSProperties, ReactNode } from 'react'

import { Text } from '@ui/Typography'

interface ItemProps {
  title: string | number
  description?: string | ReactNode
  flex?: boolean
}
export const RepoDescriptionItem: React.FC<ItemProps> = ({
  title,
  description,
  flex,
}) => {
  return (
    <section
      style={{
        display: flex ? 'flex' : 'block',
        margin: '2px 5px',
        justifyContent: 'space-around',
      }}
    >
      <Text style={{ color: `var(--primary-color)` }} weight={'bold'}>
        {title}&#160;
      </Text>
      <Text>{description}</Text>
    </section>
  )
}
