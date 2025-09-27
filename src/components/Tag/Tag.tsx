import React from 'react'
import styles from './tag.module.scss'
import { TAG_TYPES } from '@/utils/types'
import cx from 'classnames'

type TagProps = React.HTMLAttributes<HTMLDivElement> & {
  type: TAG_TYPES
  text: string
}

export const Tag: React.FC<TagProps> = ({ type, text }) => {

  const tagClass = cx(styles.tag, {
    [styles.featured]: type === TAG_TYPES.FEATURED,
    [styles.onSale]: type === TAG_TYPES.ON_SALE,
  })

  return (
    <div className={tagClass}>
      {text}
    </div>
  )
}
