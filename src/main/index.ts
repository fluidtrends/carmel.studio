import { start, quit } from './system'

process.on('warning', (warning) => {
    // console.log(warning.stack)
})

require('electron-squirrel-startup') ? quit() : start()