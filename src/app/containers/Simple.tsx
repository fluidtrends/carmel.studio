import React, { useEffect, useState } from 'react'
import { SimpleContainerProps } from '../types'
import * as styles from '../styles'

/**
 * 
 * @param props 
 */
export const Simple: React.FC<SimpleContainerProps> = (props) => {
  return (<div style={styles.container}>
    { props.children }
  </div>)
}