import * as system from './system'
import fs from 'fs-extra'
import path from 'path'
import extend from 'deep-extend'
// import { Index } from 'dodi'
import {
    Vault 
} from 'cassi'

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

export const secretsVault = () => {
    return _vault
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
    const service = `carmel.secrets`
    _vault = new Vault({ service, name: '.data', root: path.resolve(system.env().secrets.path) })
    await _vault.initialize()
}

export const setSecret = async (key: string, values: any) => {
    await init()
    if (!secretsVault() || secretsVault().isLocked) return
    try {
        const oldKey = secretsVault().read(key) || {}
        const all =  { ...oldKey, ...JSON.parse(values) }
        secretsVault().write(key, all)
    } catch (e) {
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

export const create = async() => {
    console.log("session create")

    if (!exists()) {
        system.env().home.exists || fs.mkdir(system.env().home.path)
        system.env().secrets.exists || fs.mkdir(system.env().secrets.path)
        
        fs.writeFileSync(path.resolve(system.env().home.path, sessionFile), JSON.stringify({
            createdTimestamp: Date.now(),
            modifiedTimestamp: Date.now()
        }, null, 2), 'utf8')
    }

    await init()
}

export const update = (data: any) => {
    if (!exists()) return
    const now = load(true)
    const updated = JSON.stringify(extend(now, data), null, 2)

    fs.writeFileSync(path.resolve(system.env().home.path, sessionFile), updated, 'utf8')
}

