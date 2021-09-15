import React, { memo, useEffect, useCallback, useState, useRef } from 'react'
import { Typography, Progress, Badge } from 'antd'
import { useDispatch, useSelector } from "react-redux"
import { WelcomeScreenProps, State } from '../types'
import { useEvent, useAnimatedText } from '../hooks'
import * as styles from '../styles'
import { replace } from 'connected-react-router'
import { initialize } from '../data'
import Player from 'react-player'
import { Fade } from 'react-awesome-reveal'
import { CheckOutlined, SettingOutlined } from "@ant-design/icons"
import { Video } from '../components'
// import { tw } from 'twind'
import { ArrowRightIcon } from '@heroicons/react/solid'

// import { tw } from 'twind'
// const { 0 } = twind
// console.log(twind)

const { tw } = require('twind')

const { Title, Text } = Typography

const TICK = 300
const TICKS = 100

import intro from '../../intro.json'

/**
 * 
 * @param props 
 */
export const Welcome: React.FC<WelcomeScreenProps> = (props) => {
  const slides = useRef(null)
  const player = useRef(null)
  const setupEvent: any = useEvent() 
  const loadEvent: any = useEvent() 
  const [status, setStatus] = useState('Setting Up Your Carmel Environment ...')
  const [timer, setTimer] = useState<any>()
  const [slideId, setSlideId] = useState(0)
  const [time, setTime] = useState(0)
  const [isDone, setDone] = useState(false)
  const [videoIsDone, setVideoIsDone] = useState(false)
  // const carmel = useMesh({})

  useAnimatedText(['animTitle', ['animSubtitle', 'intro'], ['animButton', 'bounce', { button: true }]])
  const session = useSelector((state: State) => state.session)

  const dispatch = useDispatch()
  
  const onVideoDone = () => {
    // setVideoIsDone(true)
    // startSlides()
  }

  const startSlides = () => {
    setTimer(setInterval(() => setTime(t => t + 1), TICK))
  }
  
  useEffect(() => {
    // startSlides()
    // const anime = require('animejs')

   
      // setupEvent.send({ type: "setup" })
  }, [])

  // useEffect(() => {
  //   if (time >= TICKS) {
  //     setSlideId((intro as any).slides.length === slideId + 1 ? 0 : slideId + 1)
  //     setTime(0)
  //     return
  //   }     
  // }, [time])

  // useEffect(() => {
    // if (!setupEvent.received.id) return 
    // console.log(setupEvent.received)

    // const { status } = setupEvent.received
    // setStatus(`${status}`)

    // if (setupEvent.received.done) {
      // dispatch(replace('/products'))
    //   loadEvent.send({ type: 'load' })
    // }
//  }, [setupEvent.received])

  // useEffect(() => {
  //   // if (!loadEvent.received.id) return
  //   // console.log(loadEvent.received)
  //   // loadEvent.received.type === 'loaded' && dispatch(initialize(loadEvent.received)) 
  // }, [loadEvent.received])

  // useEffect(() => {
  //   // if (!session.loadedTimestamp) return
  //   // setDone(true)
  // }, [session])

  const onStart = () => {
    // clearInterval(timer)
    // dispatch(replace('/product'))
  }

  // const Slide = (slide: any) => {
  //   return (<div style={{
  //     width: "100%",
  //     display: "flex",
  //     flex: 1,
  //     backgroundColor: "#ffffff",
  //     padding: 20,
  //     opacity: (((TICKS - time)*1.5)/(TICKS)),
  //     flexDirection: "row",
  //     alignItems: "center",
  //     justifyContent: "center"
  //   }}>
  //       <div style={{
  //         display: "flex",
  //         flex: 1,
  //         flexDirection: "column",
  //         alignItems: "center",
  //         justifyContent: "center",
  //       }}>
  //         <Title style={{
  //           color: "#5FB0E5"
  //         }}> { slide.title } </Title>
  //         <Title level={4} style={{
  //           textAlign: "justify",
  //           color: "#607D8B"
  //         }}> { slide.text } </Title>
  //       </div>
  //       <div style={{
  //           display: "flex",
  //           flex: 1,          
  //           flexDirection: "column",
  //           alignItems: "center",
  //           justifyContent: "center",
  //       }}>
  //         <img src={require(`../../../assets/${slide.image}`).default} style={{
  //         width: "100%"
  //       }}/>
  //     </div>
  //   </div>)
  // }

  // const IntroSlides = () => {
  //   const slide = (intro as any).slides[slideId]
  //   return (<div style={{
  //     display: "flex",
  //     height: "100%",
  //     backgroundColor: "#ffffff",
  //     flexDirection: "column",
  //     alignItems: "center", 
  //     justifyContent: "center"
  //   }}>
  //      <img src={require(`../../../assets/icon-216.png`).default} style={{
  //         height: 80,
  //         margin: 20,
  //         opacity: (((TICKS - time)*1.5)/(TICKS)),
  //     }}/>
  //     <Slide key={slide.id} {...slide} style={{
  //       display: "flex",
  //       height: "100%",
  //       flex: 1
  //     }}/>
  //     <Progress
  //       style={{
  //         margin: 10
  //       }}
  //       showInfo={false}
  //       strokeColor={{
  //         from: '#EDF6FC',
  //         to: '#5FB0E5',
  //       }}
  //       percent={time}
  //       status="active"
  //   />
  //     <Title level={4} style={{ marginBottom: 20 }}>
  //       { status }
  //     </Title>
  //   </div>)
  // }

  // if (!videoIsDone) {
  //   return <Video onDone={onVideoDone} url={introVideo}/>
  // }

  // return (<div style={styles.screen}>      
  //   <IntroSlides/>
  //   { isDone && <Button 
  //       type="primary" 
  //       onClick={onStart}
  //       icon={<CheckOutlined />}
  //       style={{
  //         marginBottom: 20
  //       }}>
  //           Get Started Now
  //       </Button>
  //   }
  // </div>)

  const imgPath = (name: string, type: string = 'png') => require(`../../../assets/${name}.${type}`).default

  // const Header = () => (
  //   <div>
      
  //     </div>
  // // )

  // const Button = ({ href, primary, negative, action, modifier, children, ...rest }: any) => {
  //   const baseStyle = `font-sans animButton font-medium border rounded p-6`;
  //   const prime = `bg-primary text-white border-none hover:bg-primary-100 hover:text-white`
  //   let styles = primary ? prime : action ? `${prime} p-4 text-2xl` : `text-white m-4 border-1 hover:border-primary-100 hover:bg-primary-100 hover:text-white border-white`
  
  //   if (negative) {
  //     styles = `text-white m-4 mx-auto absolute bottom-20 border-1 hover:border-white hover:bg-primary hover:text-white border-white`
  //   }
  
  //   return (
  //     <a type="button" className={tw(`animButton`) }>
  //       Get Started
  //     </a>
  //   )
  // }

  const start = () => {
    dispatch(replace('/register'))
  }

  const Top = () => (
    <div className={tw(`w-full mx-auto p-8`)}>
        <div className={tw(`mb-16 text-center`)}>
          <div className={tw(`text-7xl font-bold text-white `)}>
            <div className="animTitle">
              Welcome to Carmel
            </div>
          </div>
          <div className={tw(`mt-20 text-4xl text-white `)}>
            <div className="animSubtitle">
              Ready To Start Your DeDev Journey?
            </div>
          </div>
          <a type="button" onClick={start} className={tw(`animButton mx-auto bottom-20 border-1 p-6 mt-16 border-white hover:bg-white hover:text-primary`) }>
            Get Started
          </a>
        </div>
    </div>
  )

 return (<div className={tw(`bg-cover bg-bottom min-h-screen w-full`)} style={{ 
        backgroundImage: `url(${imgPath('workspace')})`
      }}>
          <div className={tw(`w-full min-h-screen bg-black bg-opacity-70 text-white text-4xl flex flex-row items-center`)}>
            <Top/>
        </div>
  </div>)
}

{/* <h4 className={tw(`text-white font-semibold tracking-wide text-4xl uppercase`)}>
            Welcome to Carmel
          </h4>`` */}
{/* <Button 
type="primary" 
onClick={onStart}
icon={<CheckOutlined />}
style={{
  marginBottom: 20
}}>
    Get Started Now
</Button> */}