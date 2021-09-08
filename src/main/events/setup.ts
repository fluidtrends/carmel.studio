import { send } from './main'
import * as system from '../system'
import { 
    downloadNodePackage,
    installNodeDependencies,
    installBundle,
    installPacker,
    installStack,
    installCacheArchive
} from '../services/files'
import { 
    npm
} from './commands'
import axios from 'axios'
import fs from 'fs-extra'
import path from 'path'
// import { eos } from '../services/blockchain'
import { generateIdentity } from '@carmel/eos/src/crypto'

const IPFS_GATEWAY = "cloudflare-ipfs.com"
const USER_HOME = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME']

// export const setupStudio = async (e: any) => {
//     const settings = await eos.read("carmelsystem", "carmelsystem", "settings")
    
//     if (!settings || !settings.rows || settings.rows.length === 0) {
//         throw new Error("Settings not found")
//     }

//     const datahash = settings.rows.find((r: any) => r.key === "maindatahash")

//     if (!datahash || !datahash.value) {
//         throw new Error("Main data hash not found")
//     }

//     const url = `https://${IPFS_GATEWAY}/ipfs/${datahash.value}/latest.json`

//     const { data } = await axios({ method: 'get', url, responseType: 'json' })
    
//     if (!data) {
//         throw new Error('Could not find release manifest')
//     }

//     const { nodeVersion } = data

//     if (!nodeVersion) {
//         throw new Error('Invalid release manifest')
//     }    

//     const env = system.env()

//     await send({ id: e.id, type: 'setup', status: 'Preparing your environment ...' })    

//     // await installCacheArchive({ name: 'pnpm', id: 'pnpm-files-0', version: "v3", type: "cache" })
//     // await installCacheArchive({ name: 'pnpm', id: 'pnpm-files-1', version: "v3", type: "cache" })
//     // await installCacheArchive({ name: 'pnpm', id: 'pnpm-metadata', version: "v3", type: "cache" })

//     await send({ id: e.id, type: 'setup', status: 'Installing JavaScript ...' })    
//     await installCacheArchive({ name: 'node', version: nodeVersion, datahash, type: "cache" })
//     await npm({ nodeVersion, cmd: 'i -g pnpm' })
//     await npm({ nodeVersion, cmd: `config set store-dir "${path.resolve(USER_HOME, '.carmel', 'cache', 'pnpm')}"` })

//     await send({ id: e.id, type: 'setup', status: 'Installing the Carmel SDK ...' })    
//     const sdk = await downloadNodePackage({ nodeVersion, id: '@carmel/sdk', type: "cache" })    
//     await installNodeDependencies({ nodeVersion, name: sdk.name, version: sdk.version, type: "cache" })

//     await send({ id: e.id, type: 'settingUp', status: 'Installing the default packer ...' })    
//     const papanache = await installPacker({ nodeVersion, id: "papanache" })

//     await send({ id: e.id, type: 'settingUp', status: 'Installing the default stack ...' })    
//     const jayesse = await installStack({ nodeVersion, id: "jayesse" })

//     await send({ id: e.id, type: 'settingUp', status: 'Installing the default bundle ...' })    
//     const traista = await installBundle({ nodeVersion, id: "traista" })

//     await send({ id: data.id, type: 'settingUp', status: 'Initializing Your System ...' })    

//     system.init({
//         yarn: true,
//         node: {
//             default: nodeVersion,
//             versions: [nodeVersion]
//         },
//         sdk: {
//             default: sdk.version,
//             versions: [sdk.version]
//         },
//         packers: {
//             papanache: { versions: [papanache.version] }
//         },
//         stacks: {
//             jayesse: { versions: [jayesse.version] }
//         },
//         bundles: {
//             traista: { versions: [traista.version] }
//         }
//     }, "test1234")
    
//     await send({ id: e.id, type: 'settingUp', status: 'Your Carmel Environment Is Ready', done: true })    
// }

export const setup = async (e: any) => {
    // const settings = await eos.read("carmelsystem", "carmelsystem", "config")
    
    // if (!settings || !settings.rows || settings.rows.length === 0) {
    //     throw new Error("Settings not found")
    // }

    // console.log(settings.rows)

    const username = e.username
    const { publicKey, privateKey, mnemonic } = generateIdentity({ credentials: e })
    const identity = { username, publicKey }

    const now = Date.now()

   await system.init({
        createdTimestamp: now,
        loadedTimestamp: now,
        identity,
        node: {
        },
        sdk: {
        },
        packers: {
        },
        stacks: {
        },
        bundles: {
        }
    }, e.password)    

    await system.setSecret('identity', { privateKey, username })
    await send({ 
        id: e.id, 
        type: 'setupDone', 
        mnemonic, 
        session: system.session,
        username, 
        status: 'Your Carmel Environment Is Ready', 
        done: true 
    })
}