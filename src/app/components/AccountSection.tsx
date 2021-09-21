import React, { memo, useEffect, useCallback, useState, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { WelcomeScreenProps, State } from '../types'
import { useEvent, useAnimatedText } from '../hooks'
import { replace } from 'connected-react-router'
import { Fade } from 'react-awesome-reveal'
import { UserCircleIcon, ChevronDownIcon,   
  PencilAltIcon,
  XIcon,
  ArrowCircleLeftIcon,
  CheckIcon,
  CreditCardIcon, LockOpenIcon, LockClosedIcon, KeyIcon, IdentificationIcon, CogIcon 
} from '@heroicons/react/solid'

const { tw } = require('twind')

export const AccountSection: React.FC<any> = (props: any) => {
  const [isEditing, setIsEditing] = useState(false)
  const [fields, setFields] = useState<any>({})
  const [isWorking, setIsWorking] = useState(true)
  const saveEvent: any = useEvent()
  const [error, setError] = useState('')

  // const session = useSelector((state: State) => state.session)
  const dispatch = useDispatch()
  
  useEffect(() => {  
  }, [])

  useEffect(() => {
    if (!saveEvent.received.id) return      

    console.log(saveEvent.received)

    if (saveEvent.received.error) {
      setIsWorking(false)
      setIsEditing(true)
      setError(saveEvent.received.error)
      setTimeout(() => { setError('') }, 2000)
      return
    }

    setIsWorking(false)

  }, [saveEvent.received])


  const imgPath = (name: string, type: string = 'png') => require(`../../../assets/${name}.${type}`).default
 
  useEffect(() => {
    if (!props.fields) return 
    setFields(props.fields)
    setIsWorking(false)
  }, [])

  const onFieldChange = (e: any) => {
    const  { id, value } = e.target
    const newFields = Object.assign({}, fields)
    newFields[id].value = value 

    setFields(newFields)
  }

  const renderField= (key: string) => (
    <div className={tw(`flex border-b border-gray-200 py-2`)} key={key}>
      <span className={tw(`text-primary text-l my-auto mr-10 w-1/5`)}>{ fields[key].title }: </span>
      <span className={tw(`text-gray-900 font-bold text-xl my-auto w-4/5`)}>
        {
          isEditing && fields[key].editable ? <input autoFocus type="text" id={key} onChange={onFieldChange} defaultValue={fields[key].value} className={tw("w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8")}/> 
                    : fields[key].value
        }
      </span>
    </div>
  )

  const onEdit = () => {
    setIsEditing(true)
  }

  const onStopEdit = () => {
    setIsEditing(false)
  }

  const onSave = () => {
    setIsEditing(false)
    
    if (!props.id) {
      return 
    }

    setIsWorking(true)
    saveEvent.send({ type: 'saveAccount', section: props.id, data: { ...fields }})
  }

  const onBack = () => {
    dispatch(replace('/dashboard'))
  }
    
  const gradient = "bg-gradient-to-t from-primary-100 via-primary to-gray-900"

  if (isWorking) {
    return (
      <svg className={tw("animate-spin h-12 w-12 text-white mr-3 bg-primary")} viewBox="0 0 24 24">
    </svg>    )
  }


  const showError = () => {
    if (!error) return <div/>
    return (<div className={tw("bg-red-200 relative text-red-500 py-3 px-3 rounded-lg text-medium")}>
        { error }
    </div>)
  }

  return (<div className={tw(`w-full min-h-screen text-white text-4xl flex flex-col items-center w-full h-full ${gradient}`)}>
          <div className={tw(`p-10 text-xl h-1/6 mt-10 mx-auto`)}>
            <props.icon className={tw("h-16 w-16 text-white mx-auto")}/>
            <p className={tw("leading-relaxed text-white text-3xl")}>
              { props.title }
            </p>
            { showError() }
          </div>
          <div className={tw(`bg-white overflow-auto w-4/5 p-10 text-xl h-5/6 m-8 mx-auto item-center flex flex-col`)}>            
           { Object.keys(fields).map((key: string) => renderField(key)) }
          </div>
          { 
              isEditing ? 
              <div className={tw(`flex`)}>
              <button onClick={onStopEdit} className={tw("text-primary mr-8 bg-white border-0 py-2 px-6 hover:text-primary focus:outline-none hover:bg-primary-100 rounded text-lg mb-4 flex")}>
                <XIcon className={tw("h-6 w-6 mr-4")}/>
                Cancel 
              </button>
              <button onClick={onSave} className={tw("text-white bg-primary border-0 py-2 px-6 hover:text-primary focus:outline-none hover:bg-primary-100 rounded text-lg mb-4 flex")}>
                <CheckIcon className={tw("h-6 w-6 mr-4")}/>
                Save 
              </button> 
              </div> : 
              <button onClick={onEdit} className={tw("text-white bg-primary border-0 py-2 px-6 hover:text-primary focus:outline-none hover:bg-primary-100 rounded text-lg mb-4 flex")}>
                <PencilAltIcon className={tw("h-6 w-6 mr-4")}/>
                Edit 
              </button> 
          }
      <button onClick={onBack} className={tw("text-white border-0 text-xl absolute left-10 top-10 focus:outline-none hover:animate-pulse")}>
          <ArrowCircleLeftIcon className={tw("h-12 w-12")}/>
          Back
      </button>
</div>)
}