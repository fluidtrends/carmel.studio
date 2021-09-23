import React, { useEffect } from 'react'
import { StartScreenProps, State } from '../types'
import { Spin } from 'antd'
import * as styles from '../styles'
import strings from '../strings.json'
import { useEvent } from '../hooks'
import { replace } from 'connected-react-router'
import { useDispatch, useSelector } from "react-redux"
import { initialize } from '../data'

/**
 * 
 * @param props 
 */
export const Start: React.FC<StartScreenProps> = (props) => {
  const session = useSelector((state: State) => state.session) 
  const loadEvent: any = useEvent() 
  const dispatch = useDispatch()

  useEffect(() => {
    // if (session && session.env) {
    //   const screen = session.productId ? '/product' : '/dashboard'
    //   dispatch(replace(screen))      
    //   return 
    // }
    
    loadEvent.send({ type: 'startSession' })
  }, [])

  useEffect(() => {
    if (!loadEvent.received.id) return
   
    const { session } = loadEvent.received

    if (!session) {
      dispatch(replace('/welcome'))
      return 
    }

    dispatch(initialize({ session, products: [], profile: { } }))      
    const screen = session.productId ? '/product' : '/dashboard'
    dispatch(replace(screen))
  }, [loadEvent.received])

  return (<div style={styles.screen}>
     <Spin tip={strings.initializing}/>
  </div>)
}