import React, { useState } from 'react'
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
    const [working, setWorking] = useState(false)
    // const [plan, setPlan] = useState<any>('')
    // const [freePlan, setFreePlan] = useState<any>('')
    useAnimatedText([['animTitle', 'line']])

    const layout = {
      wrapperCol: { span: 24 },
    }

    const checkAvailable = () => {
      setWorking(true)
    }

    // const selectPlan = (plan: any, freePlan: any) => {
    //   setPlan(plan)
    //   setFreePlan(freePlan)
    // }

    // const renderForm = () => (
    //   <AuthForm plan={plan} freePlan={freePlan} login={false}/>
    // )

    // const renderPlans = () => (
    //   <Plans selectPlan={selectPlan}/>
    // )
  
    // return (<div style={{
    //     ...styles.screen,
    //     backgroundColor: "#f5f5f5",
    //     ...layout
    //   }}>       
    //    dddd
    // </div>)

    const imgPath = (name: string, type: string = 'png') => require(`../../../assets/${name}.${type}`).default

    const FormDetails = () => {
      if (working) {
        return (
          <div className={tw("w-1/3 bg-white rounded-lg p-8 flex flex-col w-full items-center justify-center")}>
            <div className={tw("animate-spin rounded-full h-24 w-24 border-b-2 border-primary")}></div>
          </div>
        )
      }

      return (<div className={tw("w-1/3 bg-white rounded-lg p-8 flex flex-col w-full justify-center")}>
          <h2 className={tw("text-gray-900 text-2xl mb-1 font-medium title-font")}>Choose your username</h2>
          <div className={tw("relative mb-4")}>
            <input type="email" id="email" name="email" className={tw("w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out")}/>
          </div>
          <button onClick={checkAvailable} className={tw("text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg")}>
            Check if available
          </button>
      </div>)
    }
 
    const Form = () => (
      <div className={tw("container w-full p-20")}>
          <div className={tw("flex flex-wrap p-10")}>
            <div className={tw("w-2/3 p-12")}>
              <p className={tw("leading-relaxed mb-5 text-white text-2xl")}>
                Your Carmel ID is your entry to the Blockchain world as a builder and your first step in your DeDev Journey. 
                Carmel IDs are fully decentralized digital identities that give you 100% control over your data.
              </p>
            </div>

            <FormDetails/>
        
        </div>
    </div>)

    return (<div className={tw(`bg-cover bg-bottom min-h-screen w-full`)} style={{ 
      backgroundImage: `url(${imgPath('bg1', 'jpg')})`
    }}>
         
        <div className={tw(`w-full min-h-screen bg-black bg-opacity-70 text-white text-4xl flex flex-col items-center`)}>
            <UserCircleIcon className={tw("h-24 w-25 text-white mt-20")}/>
            <p className={tw("animTitle leading-relaxed text-white text-5xl")}>
              Get Your Carmel ID  
            </p>
            <Form/>
      </div>
</div>)
}

{/* <div className={tw("w-full flex flex-col")}>
          <div className={tw("w-2/4 bg-primary")}>
            <p className={tw("animTitle leading-relaxed mb-5 text-white text-3xl")}>
              Your Carmel ID is your entry to the Blockchain world as a builder.
            </p>
          </div>

         <div className={tw("w-1/4 bg-white rounded-lg flex flex-col")}>
         
        </div> */}
{/*
   <div className={tw("w-1/3 bg-white rounded-lg flex flex-col p-8 justify-center items-center")}>            
     <FormFields/>
   </div>
*/}