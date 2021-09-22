import { send, _loadUser } from './main'
import { carmel } from './commands'
import * as system from '../system'
import { createAccount, chain, DEFAULT_URL } from '@carmel/eos/src/eos'
const ecc = require('eosjs-ecc')

/////

// const _doLogin = async (credentials: any) => {
//     const now = Date.now()

//     // Get the user data
//     const user = await _loadUser({ username: credentials.username })

//     // Save credentials
//     const result = await carmel({ cmd: 'data', args: [{
//             name: "save",
//             value: true
//         }, {
//             name: "secure",
//             value: true
//         }, {
//             name: "key",
//             value: "_auth"
//         }, {
//             name: "values",
//             value: JSON.stringify({
//                 privateKey: credentials.privateKey,
//                 publicKey: credentials.publicKey
//             })
//         }, {
//             name: "password",
//             value: credentials.password
//         }]
//     })
    
//     if (result.stderr) {
//         throw Error('Login failed')
//     }

//     // Save user data
//     system.update({ loadedTimestamp: now, user })

//     return user
// }

/////

const _sign = async (message: string) => {
    const { privateKey } = await system.getSecret('identity')
    if (!privateKey) return 
    
    return ecc.sign(message, privateKey)
}


export const fetchIdentity = async (data: any) => {
     const identity = await system.server.gateway.fetchIdentity(data.username)
    
     await send({ 
        id: data.id, 
        type: 'fetchIdentity', 
        identity: identity ? identity.data : false
    })
}

export const saveAccount = async (props: any) => {
    const data: any = {}
    Object.keys(props.data).map((k: string) => data[k] = props.data[k].value)

    const update = await system.server.identity.update(data, _sign)
    console.log(update)
    // const { privateKey } = await system.getSecret('identity')

    // const identity = await system.server.chain.getId()
    // const account = await system.server.pull("account", { username, publicKey })

    // const { cid } = await system.server.push("account", { username, publicKey })
    // const ecc = require('eosjs-ecc')
    // const signature = ecc.sign(`0:${cid}`, privateKey)

    // system.server.send.system({
    //     call: "register",
    //     data: {
    //         publicKey,
    //         username,
    //         signature,
    //         cid
    //     }
    // })

    await send({ 
        id: props.id, 
        type: 'saveAccount', 
        error: "Oops"
    })
}

export const register = async (credentials: any) => {
    const { publicKey, username } = credentials

    // system.reload()
    // const env: any = system.env()
    // const isLocked = env.lock.exists

    // if (isLocked) {
    //     await send({ 
    //         id: credentials.id,
    //         type: 'registerError',
    //         isLocked: true
    //     })
    //     return
    // }

    await system.server.identity.create({
        publicKey, username
    }, _sign)

    // if (credentials.plan.requiredTokens > 0) {
    //     // Make a payment
    //     const total = (parseFloat(credentials.plan.requiredTokens) / 10000).toFixed(4)
        
    //     await eos.tokens.call("transfer", {
    //         from: credentials.account.id,
    //         to: "carmelsystem",
    //         quantity: `${total} CARMEL`,
    //         memo: `${credentials.username}:${credentials.plan.id}:1`
    //     })
    // }

    // // Log the user in
    // const user = await _doLogin(credentials)

    await send({ 
        id: credentials.id,
        type: 'eventSent'
    })
}

// export const login = async (credentials: any) => {
//     system.reload()
//     const env: any = system.env()

//     // Get the user data
//     const user = await _doLogin(credentials)

//     await send({ 
//         id: credentials.id,
//         type: 'loginSuccess',
//         user,
//         session: system.session,
//         env
//     })
// }

// export const listPlans = async (data: any) => {
//     const plans = await eos.read("carmelsystem", "carmelsystem", "plans")

//     if (!plans || !plans.rows || plans.rows.length === 0) {
//         throw new Error("Plans not found")
//     }

//     const settings = await eos.read("carmelsystem", "carmelsystem", "settings")

//     if (!settings || !settings.rows || settings.rows.length === 0) {
//         throw new Error("Settings not found")
//     }

//     await send({ 
//         id: data.id,
//         type: 'plansList',
//         plans: plans.rows,
//         settings: settings.rows
//     })
// }

// export const checkEOSKey = async (data: any) => {
//     const key = await eos.checkKey(data)

//     await send({ 
//         id: data.id,
//         type: 'checkEOSKey',
//         ...key
//     })
// }

// export const findUser = async (data: any) => {
//     const result = await eos.read("carmelsystem", "carmelsystem", "users", ["name", "secondary", data.username])
    
//     if (!result || !result.rows || result.rows.length === 0) {
//         await send({ 
//             id: data.id,
//             username: data.username,
//             type: 'findUser'
//         })
//         return     
//     }

//     await send({ 
//         id: data.id,
//         type: 'findUser',
//         username: data.username,
//         user: result.rows[0]
//     })
// }