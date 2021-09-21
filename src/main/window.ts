import { BrowserWindow, BrowserView, app } from 'electron'
import * as tray from './tray'

declare const MAIN_WINDOW_WEBPACK_ENTRY: any
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: any

export let window: BrowserWindow
export let browser: BrowserWindow
export let browserView: BrowserView
export let browserViewIsMobile = false

export const hasWindow = BrowserWindow.getAllWindows().length > 0
export const content = () => window ? window.webContents : undefined
export const browserContent = () => browserView ? browserView.webContents : undefined

export const hide = () => {
  if (!window || !window.isVisible()) return

  window.hide() 
  tray.update()
}

export const show = () => {
  if (!window || window.isVisible()) return

  window.center()
  window.show()
  tray.update()
}

export const isVisible = () => window && window.isVisible()

export const toggle = () => {
  if (!window) return

  window.isVisible() ? hide() : show()
}

export const hideBrowser = () => {
  try {
    // if (!browserView || browserView.isDestroyed()) return 

    // browserView.setBounds({ x: 0, y: 0, width: 0, height: 0 })
    // browserView.destroy()
  } catch (e) {
  }
}

export const updateBrowser = (data: any) => {
  if (browserView.getBounds().height === 0) return 

  const { width, height } = window.getBounds()
  browserViewIsMobile = data.mobile || false

  const w = 400
  const workspace = 690
  const mobilePad = (width - workspace - w) / 2
  const x = Math.ceil(workspace + (browserViewIsMobile ? mobilePad : 0))

  browserView.setBounds({ x, y: 115, width: (browserViewIsMobile ? w : width - workspace - 5), height: height - 142 })
  browserView.webContents.setUserAgent(browserViewIsMobile ? "carmelmobile" : "carmeldesktop")
  browserView.webContents.reload()
}

export const showBrowser = (data: any) => {
  if (!data.product || !data.product.packerPort) return

  const { width, height } = window.getBounds()
  browserViewIsMobile = data.mobile 

  const w = 400
  const workspace = 690
  const mobilePad = (width - workspace - w) / 2

  browserView = new BrowserView()
  window.setBrowserView(browserView)
  const x = Math.ceil(workspace + (browserViewIsMobile ? mobilePad : 0))

  browserView.setBounds({ x, y: 129, width: (browserViewIsMobile ? w : width - workspace - 5), height: height - 156 })
  browserView.setAutoResize({ width: true, height: true, horizontal: true, vertical: true })
  browserView.webContents.loadURL(`http://localhost:${data.product.packerPort}`)
  browserView.webContents.setUserAgent(browserViewIsMobile ? "carmelmobile" : "carmeldesktop")
  browserView.webContents.reload()
}

export const create = () => {
  window = new BrowserWindow({
    width: 1280,
    minWidth: 1280,
    height: 800,
    minHeight: 800,
    show: false,
    frame: true,
    fullscreenable: true,
    resizable: true,
    title: "Carmel",
    transparent: false,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,
      backgroundThrottling: false,
      contextIsolation: false,
      webviewTag: false
    }
  })

  window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  window.on('close', () => {
    hide()
  })

  window.on('resize', function () {
      // if (!browserView || browserView.isDestroyed()) return 

      const { width, height } = window.getBounds()

      const w = 400
      const workspace = 690
      const mobilePad = (width - workspace - w) / 2
      const x = Math.ceil(workspace + (browserViewIsMobile ? mobilePad : 0))
      const y = 129
      
      browserView.setBounds({ x, y, width: (browserViewIsMobile ? w : width - workspace - 5), height: height - 156 })
 })

  window.once('ready-to-show', () => {
    tray.create()
    show()
  })

  app.on("window-all-closed", () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
  
  app.on('before-quit', () => {
    window.close()
  })
}