import React, { useEffect, useState, useRef, createRef } from 'react'
import { LoginScreenProps } from '../types'
import * as styles from '../styles'
import { Plans, AuthForm } from '../components'
const { tw } = require('twind')
import { UserCircleIcon } from '@heroicons/react/solid'
import { useEvent, useAnimatedText } from '../hooks'

/**
 * 
 * @param props 
 */
export const Register = (props: any) => {  
    const usernameField = useRef<any>()
    const passwordField = useRef<any>()
    const [working, setWorking] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const registerEvent: any = useEvent()

    // const [plan, setPlan] = useState<any>('')
    // const [freePlan, setFreePlan] = useState<any>('')
    useAnimatedText([['animTitle', 'line']])

    useEffect(() => {
      if (!usernameField) return 

      usernameField.current.focus()
    }, [usernameField])

    const onUsernameChange = (u: any) => {
      usernameField.current.focus()
      setError('')
      setUsername(u.target.value)
    }

    const onPasswordChange = (p: any) => {
      passwordField.current.focus()
      setError('')
      setPassword(p.target.value)
    }

    const checkAvailable = async () => {
      setWorking(true)

      const id = await props.eos.getId(props.chains.anon, username)
 
      if (id) {
        setError('The username is not available')
        setWorking(false)
        setTimeout(() => { setError('') }, 2000)
        return 
      }

      setWorking(false)
      setShowPassword(true)
    }

    const createPhrase = async () => {
      setWorking(true)

      // const identity = await props.eos.generateIdentity(username, password)
      // console.log(identity)

      registerEvent.send({ type: 'setup', username, password })
    }

    useEffect(() => {
      if (!registerEvent.received.id) return

      // form.resetFields()
      // setWorking(false)
      // setWarning("")
      
      // if (lockEvent.received.error) {
        // setWarning(lockEvent.received.error)
        // return
      // }

      console.log(registerEvent)

      // onDone && onDone(true)
    }, [registerEvent.received])

    const imgPath = (name: string, type: string = 'png') => require(`../../../assets/${name}.${type}`).default

    const showUsernameForm = () => (
      <div className={tw("w-1/3 bg-white rounded-lg p-8 flex flex-col w-full justify-center")}>
          <h2 className={tw("text-gray-900 text-2xl mb-1 font-medium title-font")}>Choose your username</h2>
          <div className={tw("relative mb-4")}>
            <input autoFocus ref={usernameField} type="text" onChange={onUsernameChange} value={username} className={tw("w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8")}/>
          </div>
          
          { username && <button onClick={checkAvailable} className={tw("text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg")}>
            Continue
          </button> }
      </div>
    )

    const showPasswordForm = () => (
      <div className={tw("w-1/3 bg-white rounded-lg p-8 flex flex-col w-full justify-center")}>
          <h2 className={tw("text-gray-900 text-2xl mb-1 font-medium title-font")}> Set a password </h2>
          <div className={tw("relative mb-4")}>
            <input autoFocus ref={passwordField} type="password" onChange={onPasswordChange} value={password} className={tw("w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8")}/>
          </div>
          { password && <button onClick={createPhrase} className={tw("text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg")}>
            Register Now
          </button> }
      </div>
    )

    const showError = () => {
      if (!error) return <div/>
      return (<div className={tw("bg-red-200 relative text-red-500 py-3 px-3 rounded-lg text-medium")}>
          { error }
      </div>)
    }

    const FormDetails = () => {
      if (working) {
        return (
          <div className={tw("w-1/3 bg-white rounded-lg p-8 flex flex-col w-full items-center justify-center")}>
            <div className={tw("animate-spin rounded-full h-24 w-24 border-b-2 border-primary")}></div>
          </div>
        )
      }

      return showPassword ? showPasswordForm() : showUsernameForm()
    }

    const FormIntro = () => (
      <div className={tw("w-2/3 p-12")}>
        <p className={tw("leading-relaxed mb-5 text-white text-2xl")}>
          { showPassword ? 
            'Your Carmel Password secures your local Carmel Vault protected by 5 layers of security. Your sensitive data like Blockchain private keys is all stored securely in your local Carmel Vault, on this computer.' : 
            'Your Carmel ID is your entry to the Blockchain world as a builder and your first step in your DeDev Journey. Carmel IDs are fully decentralized digital identities that give you 100% control over your data.'
          }
        </p>
      </div>
    )
 
    const Form = () => (
      <div className={tw("container w-full p-20")}>
          <div className={tw("flex flex-wrap p-10")}>
            <FormIntro/>
            <FormDetails/>
        </div>
    </div>)

    return (<div className={tw(`bg-cover bg-bottom min-h-screen w-full`)} style={{ 
      backgroundImage: `url(${imgPath(showPassword ? 'bg2' : 'bg1', 'jpg')})`
    }}>         
        <div className={tw(`w-full min-h-screen bg-black bg-opacity-70 text-white text-4xl flex flex-col items-center`)}>
            <UserCircleIcon className={tw("h-24 w-25 text-white mt-20")}/>
            <p className={tw("animTitle leading-relaxed text-white text-5xl")}>
              { showPassword ? `@${username}` : 'Get Your Carmel ID'}
            </p>
            { showError() }
            <Form/>
      </div>
  </div>)
}