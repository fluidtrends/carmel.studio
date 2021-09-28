import passport from 'passport'
import express, { Express } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { asset } from '../assets'
import cookieParser from 'cookie-parser'
import http from 'http'
import * as system from '../system'
import path from 'path'
import getPort from 'get-port'
import { Session } from '@carmel/mesh/src'
import debug from 'debug'
import { ipfsConfig } from './config'
import fs from 'fs-extra'
import * as functions from './functions'
import merge from 'deepmerge'

const USER_HOME = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME']
const CARMEL_HOME = path.resolve(USER_HOME, '.carmel')
const CARMEL_ENV = path.resolve(CARMEL_HOME, 'env')
const CARMEL_JS_ENV = path.resolve(CARMEL_ENV, 'js')
const DEFAULT_ROOT = `${process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME']}/.carmel/mesh-main/`
const DEFAULT_REVISION = `1a`

const LOG = debug("carmel:studio")
export class Server {
    private _app: any 
    private _port: number 
    private _env: any
    private _runner: any
    private _session: Session
    private _root: string 

    constructor() {
        this._app = express()
        this._root = DEFAULT_ROOT
        this._env = system.env()

        fs.existsSync(this.root) || fs.mkdirpSync(this.root)
    }

    get root () {
        return this._root
    }

    get session() {
        return this._session
    }

    get app() {
        return this._app
    }
    
    get port () {
        return this._port
    }

    get env() {
        return this._env
    }

    get baseUrl() {
        return 'http://0.0.0.0'
    }

    get runner() {
        return this._runner
    }

    async init() {
        const channels = await system.getSetting('channels')

        this._session = new Session({
            isOperator: false,
            channels,
            revision: DEFAULT_REVISION,
            root: this.root
        })

        this.session.registerFunctions(functions)

        this._port = await getPort()
        this.app.set('port', this.port)
        // this.app.set('views', this.dir.path!)
        // this.app.set('view engine', 'ejs')
    
        this.app.use(
          cors({
            origin: this.baseUrl,
            methods: ['GET', 'POST'],
            credentials: true,
          })
        )
    
        this.app.use((req: any, res: any, next: any) => {
          res.header('Access-Control-Allow-Origin', this.baseUrl)
          res.header('Access-Control-Allow-Credentials', 'true')
          next()
        })
    
        // this.app.use(bodyParser.json())
        // this.app.use(bodyParser.urlencoded({ extended: false }))
        // this.app.use(cookieParser())
        this.app.use(express.static(this.env.home.path))
    
        // this.app.use(passport.initialize())
        // this.app.use(passport.session())
    }

    async stop () {
        LOG('stopping node')
        
        await this.session.stop()
    }

    async startNode () {         
        LOG('starting node ...')

        const relays = await this.session.chain.fetch.relays()
        const config = ipfsConfig(relays, `${this.root}/ipfs`, this.session.config.isOperator ? [4402, 4403, 5402, 5403, 9490] : [4302, 4303, 5302, 5303, 9390])

        try {
            const { ipfsBin } = config 
            const { createFactory } = require('ipfsd-ctl')

            const factory = createFactory(config, { js: { ipfsBin } })
            LOG('spawning IPFS gateway ...')

            const ipfs = await factory.spawn()

            LOG('spawned IPFS gateway')
     
            await this.session.start(ipfs)
        } catch (err) {
            LOG('node could not start:', err.message)
            console.log(err)
        }
    }

    async start() {
        LOG('starting server ...')

        await this.init()

        this.app.get('/', (req: any, res: any) => {
            console.log(req)
        })

        this._runner = new http.Server(this.app)
        
        await new Promise((r) => this.runner.listen(this.port, async () => {
            LOG("server Started on port", this.port)
            
            r("")
        }))

        await this.startNode()
    }
}