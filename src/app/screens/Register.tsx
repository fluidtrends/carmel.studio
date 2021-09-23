import React, { useEffect, useState, useRef, createRef } from 'react'
import { LoginScreenProps } from '../types'
import * as styles from '../styles'
import { Plans, AuthForm } from '../components'
const { tw } = require('twind')
import { BadgeCheckIcon, UserCircleIcon } from '@heroicons/react/solid'
import { useEvent, useAnimatedText } from '../hooks'
import { initialize } from '../data'
import { constants } from 'zlib'
import { clipboard  } from 'electron'
import { useSelector, useDispatch } from "react-redux"
import { replace } from 'connected-react-router'

/**
 * 
 * @param props 
 */
export const Register = (props: any) => {  
    const usernameField = useRef<any>()
    const passwordField = useRef<any>()
    const privateKeyField = useRef<any>()
    const [phraseCopied, setPhraseCopied] = useState(false)
    const [working, setWorking] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [publicKey, setPublicKey] = useState('')
    // const [privateEOSKey, setPrivateEOSKey] = useState('')
    const [phrase, setPhrase] = useState('')
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showPhrase, setShowPhrase] = useState(false)
    // const [showWallet, setShowWallet] = useState(false)
    const registerEvent: any = useEvent()
    const fetchEvent: any = useEvent()
    const sigupEvent: any = useEvent()
    const dispatch = useDispatch()

    const GRADIENTS = {
      "steel": "bg-gradient-to-r from-primary via-violet-900 to-purple-800",
      "ocean": "bg-gradient-to-tr from-green-300 via-blue-500 to-purple-600",
      "field": "bg-gradient-to-r from-blue-700 via-green-800 to-green-500"
    }

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

    // const onPrivateEOSKeyChange = (p: any) => {
    //   privateKeyField.current.focus()
    //   setError('')
    //   setPrivateEOSKey(p.target.value)
    // }

    const checkAvailable = async () => {
      setWorking(true)
      fetchEvent.send({ type: 'fetchIdentity', username })
    }

    const signup = async () => {
      setWorking(true)
      sigupEvent.send({ type: 'register', publicKey, username })
    }

    // const getStarted = async () => {
      // setShowWallet(true)
    // }

    // const importPrivateEOSKey = async () => {
    //   setWorking(true)
    //   importEvent.send({ type: 'importPrivateKey', privateKey: privateEOSKey })
    // }

    const copyPhrase = async () => {
      clipboard.writeText(phrase)
      setPhraseCopied(true)
      setTimeout(signup, 1000)
    }

    const createPhrase = async () => {
      setWorking(true)
      registerEvent.send({ type: 'setup', username, password })
    }

    useEffect(() => {
      if (!fetchEvent.received.id) return      

      if (fetchEvent.received.error) {
        setError(fetchEvent.received.error)
        return
      }

      if (fetchEvent.received.identity) {
        setError('The username is not available')
        setWorking(false)
        setTimeout(() => { setError('') }, 2000)
        return 
      }

      setWorking(false)
      setShowPassword(true)
    }, [fetchEvent.received])

    useEffect(() => {
      if (!registerEvent.received.id) return      

      if (registerEvent.received.error) {
        setError(registerEvent.received.error)
        return
      }

      const { mnemonic, publicKey, session } = registerEvent.received

      if (!mnemonic) {
        setError('The registration failed')
        setWorking(false)
        setTimeout(() => { setError('') }, 2000)
        return 
      }

      dispatch(initialize({ session, products: [], profile: { } }))      
      setPhrase(mnemonic)
      setPublicKey(publicKey)
      setShowPhrase(true)
      setWorking(false)

    }, [registerEvent.received])

    // useEffect(() => {
    //   if (!importEvent.received.id) return      

    //   if (importEvent.received.error) {
    //     setError(importEvent.received.error)
    //     return
    //   }

    //   const { wallet } = importEvent.received

    //   if (!wallet) {
    //     setError('The key import failed')
    //     setWorking(false)
    //     setTimeout(() => { setError('') }, 2000)
    //     return 
    //   }

    //   signup(wallet)
    // }, [importEvent.received])

    useEffect(() => {
      if (!sigupEvent.received.id) return      

      if (sigupEvent.received.error) {
        setError(sigupEvent.received.error)
        return
      }

      dispatch(replace('/dashboard'))
    }, [sigupEvent.received])

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

    const showPhraseForm = () => (
      <div className={tw("w-1/3 bg-white rounded-lg p-8 flex flex-col w-full justify-center")}>
          <div className={tw("animPhrase relative mb-4 text-xl text-gray-700 text-center")}>
            { phraseCopied ? <BadgeCheckIcon className={tw("h-24 w-24 text-primary mt-20 mt-auto mx-auto")}/> : phrase }
          </div>
          { phrase && !phraseCopied && <button onClick={copyPhrase} className={tw("text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg")}>
            Copy To Clipboard
          </button> }
      </div>
    )

    // const showWalletForm = () => (
    //   <div className={tw("w-1/3 bg-white rounded-lg p-8 flex flex-col w-full justify-center")}>
    //       <h2 className={tw("text-gray-900 text-2xl mb-1 font-medium title-font")}> Enter Your EOS Private Key </h2>
    //       <div className={tw("relative mb-4")}>
    //         <input autoFocus ref={privateKeyField} type="password" onChange={onPrivateEOSKeyChange} value={privateEOSKey} className={tw("w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8")}/>
    //       </div>
    //       { privateEOSKey && <button onClick={importPrivateEOSKey} className={tw("text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg")}>
    //         Import Now
    //       </button> }
    //   </div>
    // )

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

      return  showPhrase ? showPhraseForm() : showPassword ? showPasswordForm() : showUsernameForm()
    }

    const FormIntro = () => (
      <div className={tw("w-2/3 p-12")}>
        <p className={tw("leading-relaxed mb-5 text-white text-2xl")}>
          { showPhrase ? 
            'Your Carmel Recovery Phrase allows you to restore your account in case you lose your Carmel Private Key. Copy it and save it somewhere safe.' : 
            showPassword ? 
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
    
    const gradient = showPhrase ? "field" : showPassword ? "ocean" : "steel"

    return (<div className={tw(`bg-cover bg-bottom min-h-screen w-full ${GRADIENTS[gradient]}`)}>         
        <div className={tw(`w-full min-h-screen text-white text-4xl flex flex-col items-center`)}>
            <UserCircleIcon className={tw("h-24 w-25 text-white mt-20")}/>
            <p className={tw("animTitle leading-relaxed text-white text-5xl")}>
              { showPhrase ? 'Save Your Carmel Recovery Phrase' : showPassword ? `@${username}` :  'Get Your Carmel ID'}
            </p>
            { showError() }
            <Form/>
      </div>
  </div>)
}