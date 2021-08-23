import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from "react-router-dom"
import { AppContainer } from 'react-hot-loader'

import { App } from './App'
import props from '../app.json'
import './index.css'

ReactDOM.render((<App {...props} basename={"/"}/>), document.getElementById('app'))
