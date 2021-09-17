import { send } from './main'
import { carmel, runCommand } from './commands'
import * as system from '../system'
import * as window from '../window'
import fs from 'fs-extra'
import path from 'path'
import semver from 'semver'
import { installBundle, installStack, installPacker } from '../services'
import { encode, decode } from 'js-base64'
import requireFromString from 'require-from-string'
import { dialog } from 'electron'

// import { eos } from '../services/blockchain'
import { connectAdvanced } from 'react-redux'

///////

export const _resolveTemplate = (data: any) => {
    const { env, bundle, template, version } = data 
    // const { bundle_name, name, challenge_version } = challenge 

    // let bundle: any = {
    //     exists: false
    // }

    try {
    //     const cacheRootDir = path.resolve(env.home.path, "bundles", bundle_name)
    //     const bundleDir = path.resolve(cacheRootDir, version, bundle_name)
    //     const dir = path.resolve(bundleDir, "challenges", name)        
    //     const manifest = path.resolve(dir, "challenge.json")
    //     const manifestData = JSON.parse(fs.readFileSync(manifest, "utf-8"))
        
    //     const tutorials = manifestData.tasks.map((task: any) => fs.readFileSync(path.resolve(dir, 'tasks', `${task.id}`, 'tutorial.md'), "utf-8"))

    //     bundle = {
    //         dir: bundleDir,
    //         exists: fs.existsSync(bundleDir),
    //         id: bundle_name,
    //         version: challenge_version || version
    //     }

    //     const data = Object.assign({}, challenge)
        
    //     const result = {
    //         ...data,
    //         bundle,
    //         dir,
    //         isCompleted: data.done > 0,
    //         exists: fs.existsSync(manifest),
    //         ...manifestData,
    //         tutorials
    //     }

    //     return result
    } catch (e) {
        // return {
        //     ...template,
        //     exists: false
        // }
    }
}

///////

export const listTemplates = async (data: any) => {
    // const result = await eos.read("carmelsystem", "carmelsystem", "templates")
    
    // const templates = result.rows.map((t: any) => {
    //     let latestVersion: string = "0.0.1" as string

    //     (t.versions || []).map((version: string) => {
    //         latestVersion = semver.gt(version, latestVersion) ? version : latestVersion
    //     })

    //     return Object.assign({}, t, t.versions.length > 0 &&  { latestVersion })
    // })

    // console.log(templates)

    // await send({ 
    //     id: data.id,
    //     type: 'listTemplates',
    //     templates
    // })
}

export const createProduct = async (data: any) => {
    system.reload()

    const productName = data.name.replace(/\s/g, '')
    const env = system.env()
    const { node } = system.session

    try {    
        const { template } = data
        const { latestVersion } = template
        const { versions, bundle, name } = template

        // let latestVersion: string = "0.0.1" as string
        
        // (versions || []).map((version: string) => {
        //     latestVersion = semver.gt(version, latestVersion) ? version : latestVersion
        // })

        await send({ 
            id: data.id,
            type: 'createProduct', 
            message: "Setting up the template"
        })
        
        const bundleData = await installBundle({ id: bundle, version: latestVersion, nodeVersion: node.default })        
        const templateManifest = path.resolve(bundleData.dir, 'templates', name, 'index.js')

        if (!fs.existsSync(templateManifest)) {
            throw new Error('The template does not exist')
        }

        let TemplateRaw: any

        try {
            const templateManifestData = fs.readFileSync(templateManifest, 'utf-8')
            TemplateRaw = requireFromString(templateManifestData)
        } catch {}

        if (!TemplateRaw) {
            throw new Error('The template cannot be loaded')
        }

        const tmpl = new TemplateRaw()

        if (!tmpl || !tmpl.stack || !tmpl.packer) {
            throw new Error('The template is not configured properly')
        }

        const stackData = await installStack({ id: tmpl.stack, nodeVersion: node.default })
        const packerData = await installPacker({ id: tmpl.packer, nodeVersion: node.default })

        await send({ 
            id: data.id,
            type: 'createProduct', 
            message: "Creating the product from the template"
        })

        const templateId = `${bundle}/${latestVersion}/${name}`

        console.log(">", productName, templateId)

        const result = await carmel({ 
            cmd: "init",
            args: [{
                name: "name",
                value: productName
            }, {
                name: "template",
                value: templateId
            }], 
            cwd: env.home.path 
        })

        const { exitCode, stderr } = result
        
        console.log("!!", result)

        if (exitCode !== 0 || stderr) {
            throw new Error('The product could not be created')
        }

        await send({ 
            id: data.id,
            type: 'createProduct', 
            done: true
        })
    } catch (e) {
        await send({ 
            id: data.id,
            type: 'createProduct', 
            error: e.message
        })
    }
}

export const selectProduct = async (data: any) => {
    system.reload()
    system.update({ productId: data.product.id })

    await send({ 
        id: data.id,
        type: 'selectProduct' 
    })
}

export const addAsset = async (data: any) => {
    const env = system.env()
    const assetsDir = path.resolve(env.home.path, 'products', data.productId, "carmel", "assets", data.locale)
    const covers = fs.readdirSync(path.resolve(assetsDir, 'images', 'covers')).filter((i: any) => i !== '.DS_Store')

    const { filePaths, canceled } = await dialog.showOpenDialog({ properties: ['openFile'] })

    if (canceled) {
         await send({ 
            id: data.id,
            canceled,
            type: 'addAsset' 
        })
        return 
    }

    const file = filePaths[0]
    const filename = path.basename(file)

    var filepath = path.resolve(assetsDir, 'images', filename)
    
    if (data.kind === 'covers') {
        filepath = path.resolve(assetsDir, 'images', 'covers', data.name || `cover${covers.length}`)
        fs.mkdirsSync(filepath)
        filepath = path.resolve(filepath, "landscape@3x.png")
    }

    fs.copyFileSync(file, filepath)

    if (data.kind === 'covers') {
        await runCommand({ cmd: "assets", args: [
            { name: "cover", value: true },
            { name: "generate", value: true },
            { name: "name", value: data.name || `cover${covers.length}` },
            ], productId: data.productId
        })
    }

    await send({ 
        id: data.id,
        file,
        type: 'addAsset' 
    })
}

export const addContentSection = async (data: any) => {
    const env = system.env()
    const cwd = path.resolve(env.home.path, 'products', data.productId)
    const indexFile = path.resolve(cwd, 'content.json')

    fs.mkdirSync(path.resolve(cwd, 'content', data.name))
    const index = JSON.parse(fs.readFileSync(indexFile, 'utf-8'))
    index[data.name] = {
        created: `${Date.now()}`,
        files: [],
        hashes: {}
    }
    fs.writeFileSync(indexFile, JSON.stringify(index, null, 2), 'utf-8')

    await send({ 
        id: data.id,
        index,
        type: 'addContentSection' 
    })
}


export const addContentFile = async (data: any) => {
    console.log(data)
    const env = system.env()
    const root = path.resolve(env.home.path, 'products', data.productId)
    const cwd = path.resolve(root, 'content', data.section)

    const { filePaths, canceled } = await dialog.showOpenDialog({ properties: ['openFile'] })

    if (canceled) {
         await send({ 
            id: data.id,
            canceled,
            type: 'addContentFile' 
        })
        return 
    }

    const file = filePaths[0]
    const filename = path.basename(file)
    var filepath = path.resolve(cwd, filename)

    console.log(".", filepath)
    
    fs.copyFileSync(file, filepath)

    const indexFile = path.resolve(root, 'content.json')
    const index = JSON.parse(fs.readFileSync(indexFile, 'utf-8'))

    index[data.section].updated = `${Date.now()}`
    index[data.section].files.push(filename)
    fs.writeFileSync(indexFile, JSON.stringify(index, null, 2), 'utf-8')

    await send({ 
        id: data.id,
        index,
        type: 'addContentFile' 
    })
}

export const saveFile = async (data: any) => {
    const env = system.env()
    const cwd = path.resolve(env.home.path, 'products', data.productId)
    const file = path.resolve(cwd, data.path)

    fs.writeFileSync(file, data.content, 'utf8')

    const manifestFile = path.resolve(cwd, '.carmel.json')
    const manifest: any = JSON.parse(fs.readFileSync(manifestFile, 'utf8'))

    fs.writeFileSync(manifestFile, JSON.stringify({ ...manifest, timestamp: `${Date.now()}` }, null, 2), 'utf8')
}

export const loadFile = async (data: any) => {
    const env = system.env()
    const cwd = path.resolve(env.home.path, 'products', data.productId)
    const file = path.resolve(cwd, data.path)
    const content = fs.readFileSync(file, 'utf8')

    await send({ 
        id: data.id,
        type: 'fileLoaded', 
        content
    })
}

export const unselectProduct = async (data: any) => {
    system.reload()
    system.update({ productId: undefined })
    window.hideBrowser()
    
    await send({ 
        id: data.id,
        type: 'unselectProduct' 
    })
}