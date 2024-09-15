import * as system from './system'
import fs from 'fs-extra'
import path from 'path'
import extend from 'deep-extend'
// import { Index } from 'dodi'
import {
    Vault 
} from 'cassi'
import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('2345abcdefghijklmnopqrstuvwxyz', 12)

// const DEFAULT_SECTIONS = [
//     'bundles',
//     'secrets',
//     'settings',
//     'stacks',
//     'system',
//     'products',
//     'keystore',
//     'packers',
//     'events',
// ]

const sessionFile = 'carmel.json'
let _vault: any 
let _settings: any 

export const secretsVault = () => {
    return _vault
}

export const settings = () => {
    return _settings
}

export const exists = () => {
    return system.env().home.exists && fs.existsSync(path.resolve(system.env().home.path, sessionFile))
}

export const load = (skipEnv: boolean = false) => {    
    if (!exists()) return
    const core =  JSON.parse(fs.readFileSync(path.resolve(system.env().home.path, sessionFile), 'utf8'))
    
    if (!skipEnv) {
        return core 
    }

    const env = system.env()
    const isLocked = env.lock.exists

    return {
        ...core,
        isLocked,
        env
    }
}

export const init = async() => {
    const { instanceId } = load(true)
    if (!instanceId) return 

    _settings = new Vault({ service: `carmel.settings.${instanceId}`, name: '.data', root: path.resolve(system.env().settings.path) })
    await _settings.initialize()

    _vault = new Vault({ service: `carmel.secrets.${instanceId}`, name: '.data', root: path.resolve(system.env().secrets.path) })
    await _vault.initialize()
}

export const setSecret = async (key: string, values: any) => {
    await init()
    if (!secretsVault() || secretsVault().isLocked) return
    try {
        const oldKey = secretsVault().read(key)
        secretsVault().write(key,  "string" === typeof values ? values : Object.assign({}, oldKey || {}, values))
    } catch (e) {
        console.log(e)
    }
}

export const getSecret = async (key: string) => {
    await init()
    if (!secretsVault() || secretsVault().isLocked) return

    try {
        return secretsVault().read(key)
    } catch (e) {
    }
}

export const setSetting = async (key: string, values: any) => {
    await init()
    if (!settings()) return
    try {
        const oldKey = settings().read(key)
        settings().write(key,  "string" === typeof values ? values : Object.assign({}, oldKey || {}, values))
    } catch (e) {
        console.log(key, values, e)
    }
}

export const getSetting = async (key: string) => {
    await init()
    if (!settings()) return

    try {
        return settings().read(key)
    } catch (e) {
    }
}

export const lock = async (password: string) => {
    await init()
    if (!secretsVault()) return

    if (secretsVault().isLocked) { 
        return
    }

    await secretsVault().lock(password)
}

export const unlock = async (password: string) => {
    await init()
    if (!secretsVault()) return

    if (!secretsVault().isLocked) { 
        return
    }

    await secretsVault().unlock(password)  
}

const _defaultSettings = () => ({
   channels: {
    "sys:ops": {
        "events": {
            "register": "register",
            "update": "update"
        }
    },
    "stats:utils": {
        "events": {
            "time": "time"
        }
    }
   }
})

export const create = async() => {
    const instanceId = nanoid()

    system.env().home.exists || fs.mkdirpSync(system.env().home.path)
    system.env().secrets.exists || fs.mkdirpSync(system.env().secrets.path)
    system.env().settings.exists || fs.mkdirpSync(system.env().settings.path)
    
    const f = path.resolve(system.env().home.path, sessionFile)
    const now = Date.now()
    let config = { createdTimestamp: now }

    if (fs.existsSync(f)) {
        config = { ...JSON.parse(fs.readFileSync(f, 'utf8')) }
    }

    fs.writeFileSync(f, JSON.stringify({
        ...config,
        instanceId,
        modifiedTimestamp: now
    }, null, 2), 'utf8')

    await init()

    const _settings: any = _defaultSettings()
    for (let s in _settings) {
        setSetting("channels", { ..._settings[s] })
    }

}

export const update = (data: any) => {
    if (!exists()) return
    const now = load(true)
    const updated = JSON.stringify(extend(now, data), null, 2)

    fs.writeFileSync(path.resolve(system.env().home.path, sessionFile), updated, 'utf8')
}