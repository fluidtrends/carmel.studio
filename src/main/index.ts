import { start, quit } from './system'

process.env.DEBUG="carmel*"

require('electron-squirrel-startup') ? quit() : start()