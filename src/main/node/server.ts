import passport from 'passport'
import express, { Express } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import http from 'http'
import path from 'path'
import getPort from 'get-port'
// import { Session } from '@carmel/mesh'
import debug from 'debug'
import { ipfsConfig } from './config'
import { conditionalExpression } from '@babel/types'

const LOG = debug("carmel:studio")
export class Server {
    private _app: any 
    private _port: number 
    private _env: any
    private _runner: any
    // private _session: Session

    constructor(env: any) {
        this._app = express()
        this._env = env

        // this._session = new Session({
        //     isOperator: false
        // })
    }

    // get session() {
    //     return this._session
    // }

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

    async startNode () {
        // const mesh = await this.session.node.resolveMesh()
        const repo = `.cache_ipfs`
        LOG('spawning..... IPFS node')
        console.log(">>>>>Dddd")
        const config = ipfsConfig({}, repo)
     
        // const { ipfsBin } = config 
        // const { createFactory } = require('ipfsd-ctl')
 
        // const factory = createFactory(config, { js: { ipfsBin } })
        // const ipfs = await factory.spawn()
 
        LOG('spawned IPFS node')
        console.log(">>>>>Dd333333333dd")

        // await this.session.start(ipfs)
     }

    async start() {
        await this.init()

        // this.app.get('/', (req: any, res: any) => {
        //     console.log(req)
        // })

        this._runner = new http.Server(this.app)
        
        await new Promise((r) => this.runner.listen(this.port, async () => {
            console.log("**** Server Started on port", this.port, "...")
            r()
        }))

        await this.startNode()
    }

    async stop() {
    }
}