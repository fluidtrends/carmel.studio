import moment from 'moment'
import { mesh } from '../../system'

export const request = async ({ log, session, channel, id, from, type, data }: any) => {
    log(`getting time ...`, data)

    return { timestamp: `${Date.now()}`, formatted: `${moment().format(data.format)}` } 
}

export const response = async ({ log, session, channel, data }: any) => {
    log(`getting time response ...`, data)

    mesh.onResponse(data)
    
    return data
}