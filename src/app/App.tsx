import React, { useState, useEffect } from 'react'
import { connect, Provider, useDispatch } from 'react-redux'
import * as eos from '@carmel/eos'

import { ConnectedRouter } from 'connected-react-router'
import { initializeStore,  history } from './data'
import { Switch, withRouter, Route } from "react-router-dom"
import AsyncStorage from '@react-native-community/async-storage'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'

import { AppProps, State } from './types'
import { useWindowSize } from './hooks'
import * as Screens from './screens'
import * as Containers from './containers'
import * as styles from './styles'

const { setup } = require('twind')
import twindConfig from './twind.config'

if (typeof window !== `undefined`) {
  setup(twindConfig)
}

const store = initializeStore({})
const persistor = persistStore(store)
// persistor.purge()


const Routes = (props: any) => {
  const [width, height] = useWindowSize()
  const chains = {
    anon: eos.anonChain()
  }

  return (
    <Switch>
    { props.routes.map((route: any) => {
        const screenId: keyof typeof Screens = route.screen
        const containerId: keyof typeof Containers = route.container
        const Screen: any = Screens[screenId]
        const Container: any = Containers[containerId]
      return (<Route strict sensitive exact key={route.id} path={route.path}>
          <Container 
              width={width}
              height={height}
              style={styles.container}>
                  <Screen {...props }
                      eos={eos}
                      chains={chains}
                      width={width}
                      height={height}
                      style={styles.screen}
                  />
          </Container>
      </Route>)
    })}
  </Switch>
  )
}

/**
 * 
 * @param props 
 */
export const App = (props: any) => {
    
    return (
      <Provider store={store}>      
        <PersistGate loading={null} persistor={persistor}>
          <ConnectedRouter history={history}>
           <Routes {...props}/>
        </ConnectedRouter>
      </PersistGate>
    </Provider>)
}