import React, { useState, useEffect } from 'react'
import { ProfileScreenProps } from '../types'
import * as styles from '../styles'
import { Plans, VaultLock, DNSSetup } from '../components'
import { replace } from 'connected-react-router'
import { Spin, Button, Menu, Form, Tabs, Col, Tag, Input, Typography, Badge, Switch, Card } from 'antd'
import { UnlockOutlined, LockOutlined, CloseOutlined, CheckOutlined, SettingOutlined } from "@ant-design/icons"
import strings from '../strings.json'
import moment from 'moment'
import { 
  LinkOutlined,
  ExclamationCircleOutlined,
  DownOutlined
} from '@ant-design/icons'
import { State } from '../types'
import { useSelector, useDispatch } from "react-redux"
import { useEvent } from '../hooks'
import { AccountSection } from '../components'
import { UserCircleIcon, ChevronDownIcon,   
  PencilAltIcon,
  XIcon,
  ArrowCircleLeftIcon,
  CheckIcon,
  CreditCardIcon, LockOpenIcon, LockClosedIcon, KeyIcon, IdentificationIcon, CogIcon 
} from '@heroicons/react/solid'
const { Title, Text, Paragraph } = Typography
const { Search } = Input
const { TabPane } = Tabs
const { tw } = require('twind')
/**
 * 
 * @param props 
 */
export const Settings: React.FC<any> = (props) => { 
  // const session = useSelector((state: State) => state.session) 
  // const dispatch = useDispatch()
  const session = useSelector((state: State) => state.session)
  const dispatch = useDispatch()
  
  // const [isEditing, setIsEditing] = useState(false)
  const [fields, setFields] = useState<any>({})
  const [isWorking, setIsWorking] = useState(true)

  useEffect(() => { 
    const { machine } = session.env

    const original = {
      machineId: { value: machine.id || '', title: "Machine ID" }
    }

    setFields(original)
    setIsWorking(false)
  }, [])

  // const
  // const [ipfsRunning, setIpfsRunning] = useState(session.ipfsRunning)

  // const ipfs: any = useEvent()
  
  // const onIpfsRestart = () => {
  //   setWorking('Restarting IPFS ...')
  //   ipfs.send({ type: 'ipfsRestart' })
  // }

  // const onIpfsStart = () => {
  //   setWorking('Starting IPFS ...')
  //   ipfs.send({ type: 'ipfsStart' })
  // }
    
  // useEffect(() => {
  //     if (!ipfs.received.id) return
  //     console.log(">>>", ipfs.received)
  //     const session = useSelector((state: State) => state.session) 
  //     console.log(">>>>>>>", session)
  // }, [ipfs.received])

  // const onUpdate = (v: any) => {
  // }

  // const formItemLayout = {
  //   labelCol: {
  //     xs: { span: 24 },
  //     sm: { span: 4 },
  //   },
  //   wrapperCol: {
  //     xs: { span: 24 },
  //     sm: { span: 20 },
  //   },
  // }

  // const formItemLayoutWithOutLabel = {
  //   wrapperCol: {
  //     xs: { span: 24, offset: 0 },
  //     sm: { span: 20, offset: 4 },
  //   },
  // }

  // const layout = {
  //   wrapperCol: { span: 24 },
  // }

  // const tailLayout = {
  //   wrapperCol: {  span: 24 },
  // }

  // const onSkip = () => {
  //   dispatch(replace('/'))
  // }

  // const [form] = Form.useForm()

  // const renderFormField = (label: string, content: any, actions: any) => (
  //   <Form.Item key={label} label={label.toUpperCase()} style={{
  //     width: "100%",
  //  }} {...formItemLayout}>
  //    <div style={{
  //        display: "flex",
  //        flexDirection: "row"
  //    }}>
  //     { actions }
  //      <div style={{
  //        marginTop: -10,
  //        textAlign: "left",
  //        marginLeft: 20,
  //        backgroundColor: "#ffffff",
  //        display: "flex",
  //        flex: 10,
  //        borderBottom: "1px solid #c7c7c7"
  //      }}>
  //        { content }
  //       </div>
  //    </div>
  //  </Form.Item>
  // )

  // const renderEditFormField = (label: string, content: any, actions: any) => (
  //   <Form.Item key={label} label={label.toUpperCase()} style={{
  //     width: "100%",
  //  }} {...formItemLayout}>
  //    <div style={{
  //        display: "flex",
  //        flexDirection: "row"
  //    }}>
  //      { actions }
  //      <div style={{
  //        marginTop: -10,
  //        textAlign: "left",
  //        marginLeft: 20,
  //        backgroundColor: "#ffffff",
  //        display: "flex",
  //        flex: 10,
  //        borderBottom: "1px solid #c7c7c7"
  //      }}>
  //        { content }
  //       </div>
  //    </div>
  //  </Form.Item>
  // )

  // const renderActionButton = (title: string, type: any, call: any, i: number) => {
  //   return <Button size="large" key={i} type={type}
  //        onClick={call}
  //        style={{
  //          display: "flex",
  //          justifySelf: "flex-end",
  //          marginLeft: 20,
  //          flex: 1
  //        }}>
  //          <span style={{
  //            width: 80
  //          }}>
  //           { title }
  //          </span>
  //     </Button>
  // }

  // const renderText = (text: string, i: number) => {
  //   return <Paragraph key={i} style={{ 
  //       margin: 8,
  //       padding: 5, 
  //       fontSize: 15
  //     }}>
  //     { text }
  //   </Paragraph>
  // }

  // const renderTag = (color: string, content: any, i: number) => {
  //   return <Tag key={i} color={color} style={{
  //       margin: 8,
  //       padding: 5, 
  //       fontSize: 15
  //     }}>
  //        { content } 
  //   </Tag>
  // }
  
  // const renderIpfsField = () => {
  //   return renderFormField("ipfs", [
  //     renderTag(ipfsRunning ? "green" : "red", `Your IPFS Node is${ipfsRunning ? '' : ' not'} running`, 1),
  //   ], [
  //     renderActionButton(ipfsRunning ? "Stop" : "Start", "secondary", ipfsRunning ? onIpfsStart : onIpfsRestart, 10)
  //   ])
  // }   

  // const renderEnvironment = () => {
  //   return [
  //     renderIpfsField()
  //   ]
  // }
  
  // return (<div style={{
  //     ...styles.screen,
  //     backgroundColor: "#f5f5f5",
  //     ...layout
  //   }}>       
  //     <div style={{
  //        minWidth: 700,
  //        marginTop: 16,
  //        padding: 20,
  //     }}>
  //         <SettingOutlined style={{ fontSize: 30, margin: 10 }} />
  //         <Title level={2}>
  //           Settings
  //         </Title>
  //     </div>  
  //     <Form {...formItemLayoutWithOutLabel} key="form" form={form} name="control" onFinish={onUpdate} style={{
  //         backgroundColor: "#ffffff",
  //         boxShadow: "0px 0px 8px #999999",
  //         minWidth: 700,
  //         marginTop: 20,
  //         padding: 20,
  //     }}>
  //         <div style={{
  //           display: "flex", 
  //           flex: 1,
  //           marginTop: 20,
  //           width: "100%",
  //           flexDirection: "column",
  //           alignItems: "center",
  //           justifyContent: "center",
  //         }}>         
  //            {renderEnvironment()}
  //         </div>
  //     </Form>
  //     <Button type="link" htmlType="button" onClick={onSkip} style={{ margin: 20 }}>
  //           Go back
  //     </Button> 
  // </div>)

  if (isWorking) {
    return <svg className={tw("animate-spin h-12 w-12 text-white mr-3 bg-primary")} viewBox="0 0 24 24"/>
  }

  return (<AccountSection 
    title="Settings"
    fields={fields}
    icon={CogIcon}/>)
}