import React, { useEffect, useState } from 'react'
import { ProductsScreenProps, State, Product } from '../types'
import { SideMenu } from '../components'
import { useSelector, useDispatch } from "react-redux"
import { replace } from 'connected-react-router'
import { selectProduct } from '../data'
import { useEvent } from '../hooks'
import * as sections from '../components/dashboard'
import { Alert } from '../components/Alert';

const { tw } = require('twind')

const Tab = ({ title, selected, onSelect, index }: any) => {
  if (selected) {
    return ( <li className={tw("px-4 py-2 -mb-px font-semibold cursor-pointer text-gray-900 border-b-2 border-primary rounded-t")}>
    <a id="default-tab">{ title }</a>
  </li>)
  }

  return (
    <li className={tw("px-4 py-2 font-semibold cursor-pointer -mb-px text-gray-400 rounded-t")}>
      <a onClick={() => onSelect(index)}> { title }</a>
    </li>
  )
}

const Tabs = ({ tabs, selected, onSelect }: any) => (
  <div className={tw("flex w-full mx-auto rounded")}>
      <ul id="tabs" className={tw("inline-flex mx-auto w-full justify-center")}>
        { tabs.map((t: any, i: number) => <Tab title={t} index={i} onSelect={onSelect} selected={i===selected}/>)}
      </ul>
  </div>
)

export const Dashboard: React.FC<any> = (props) => {
  const selectEvent: any = useEvent() 
  const [alert, setAlert] = useState("")
  const session = useSelector((state: State) => state) 
  const Comp = sections[props.section.id as keyof typeof sections]

  useEffect(() => {
    if (!session || !session.env) {
      return 
    }
    // loadEvent.send({ type: 'startSession' })
  }, [])

  const showAlert = (data: any) => {
    setAlert(data)
  }

  const onAlertHide = () => {
    setAlert("")
  }

  return (<div className={tw("flex flex-col w-full items-center")}>
       { alert && <Alert {...alert} onHide={onAlertHide}/> }
       <Tabs {...props.section} selected={props.tab} onSelect={props.onChangedTab}/>
       <div className={tw("flex w-full h-screen")}>
         <Comp showAlert={showAlert} {...props}/>
       </div>
    </div>)
}