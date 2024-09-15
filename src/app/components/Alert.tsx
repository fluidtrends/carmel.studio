import React, { useEffect, useState } from 'react'
import styled from "styled-components"
const { tw } = require('twind')
import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/outline'
import { useTransition, animated } from 'react-spring'

const Message = ({ title, summary }: any) => (
  <div className={tw("flex w-full mx-auto rounded w-screen p-1 flex flex-col justify-center items-center")}>
      <div className={tw("shadow-2xl p-6 flex flex-row bg-white text-center text-primary rounded-lg border-1 border-gray-200")}>
        <div className={tw("bg-primary inline-block rounded-lg p-1 mr-1")}></div>
        <CheckCircleIcon className={tw("w-6 h-6 mt-1")}/> 
        <b className={tw("p-1")}>{ title }</b>
        <p className={tw("p-1 text-gray-700")}>{ summary } </p>
      </div>
    </div>
)

export const Alert: React.FC<any> = (data: any) => {
    const [items, setItems] = useState([{ data, id: 0 }])
    const transitions = useTransition(items, {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
      delay: 2000,
      onRest: () => done()
     })
    
     const done = () => {
        setItems([])
        data.onHide()
     }

     useEffect(() => {
     }, [])

    return items.length === 0 ? <div/> : (<div className={tw("absolute top-8 flex w-full mx-auto rounded")}>
      { transitions(({ item, props, key }: any) => (
          <animated.div
            key={key}
            style={{ ...props, position: 'absolute' }}>
          <Message {...data}/>
        </animated.div>))
      }
    </div>) 
}