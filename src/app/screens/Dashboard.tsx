import React, { useEffect, useState } from 'react'
import { ProductsScreenProps, State, Product } from '../types'
import { ProductListItem } from '../components'
import { useSelector, useDispatch } from "react-redux"
import { replace } from 'connected-react-router'
import { selectProduct } from '../data'
import { useEvent } from '../hooks'

/**
 * 
 * @param props 
 */
export const Dashboard: React.FC<any> = (props) => {
  const dispatch = useDispatch()
  const selectEvent: any = useEvent() 

  return (<div style={{
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%",
    overflow: "auto",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexWrap: "wrap"
  }}>
    Welcome
  </div>)
}
