import fs, { existsSync } from 'fs-extra'
import path from 'path'
import { send } from './main'
import * as system from '../system'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('2345abcdefghijklmnopqrstuvwxyz', 12)
const { dialog } = require('electron')

export const uploadDraftCover = async (data: any) => {
    const result = await dialog.showOpenDialog({ 
        properties: ['openFile'],
        filters: [{ name: 'Images', extensions: ['jpg', 'png', 'jpeg'] }]
    })

    system.reload()
    const env = system.env()

    const draftId = data.post.id || nanoid()
    const postRoot = path.resolve(env.posts.path, draftId)
    env.posts.exists || fs.mkdirpSync(env.posts.path)
    fs.existsSync(postRoot) || fs.mkdirpSync(postRoot)

    const filename = result.filePaths[0]
    const ext = path.extname(filename)
    const draftCoverFile = path.resolve(postRoot, `cover${ext}`)

    fs.copyFileSync(filename, draftCoverFile)
    const coverData = fs.readFileSync(draftCoverFile, 'base64')

    await send({ 
        id: data.id,
        draftId,
        type: 'uploadDraftCover',
        coverData: `data:image/${ext.split('.').pop()};base64,${coverData}`
    })
}

const _loadPost = (id: string, root: any) => {
    const dir = path.resolve(root, id)
    const postFiles = fs.readdirSync(dir).filter((f: any) => !f.startsWith("."))
    const data: any = {}
    let cover: any = false
    let text: any = ""

    const metaFile = path.resolve(dir, `meta.json`)

    if (!fs.existsSync(metaFile)) {
        return 
    }

    const metaContent = fs.readFileSync(metaFile, "utf8")
    const meta = JSON.parse(metaContent)

    postFiles.map((f: any) => {
        const type = path.extname(f).substring(1)
        const filename = path.basename(f, `.${type}`)
        const content = fs.readFileSync(path.resolve(dir, f), filename === 'cover' ? 'base64' : 'utf8')
        data[filename] = { type, content: filename === 'meta' ? JSON.parse(content) : content } 

        if (filename === 'cover') {
            cover = {
                type, content: `data:image/${type};base64,${content}`
            }
        } else if (filename === "text") {
            text = content
        }
    })

    return { id, ...meta, cover, text }
}

export const getPosts = async (data: any) => {
    system.reload()
    const env = system.env()

    env.posts.exists || fs.mkdirpSync(env.posts.path)

    const postIds = fs.readdirSync(env.posts.path).filter((f: any) => !f.startsWith("."))
    const posts = (postIds || []).map((id: string) => _loadPost(id, env.posts.path))
    
    console.log("SEND?", data)
    await send({ 
        id: data.id,
        type: 'getPosts',
        posts
    })
}

const _pushDirToMesh = async (dir: string) => {
    return {
        hash: "test",
        size: "5.02 mb"
    }
}

export const publishPost = async (data: any) => {
    system.reload()
    const env = system.env()

    const draftId = data.post.id
    const postRoot = path.resolve(env.posts.path, draftId)
    
    if (!fs.existsSync(postRoot)) {
        await send({ 
            id: data.id,
            error: "Missing post",
            type: 'publishPost'
        })
        return 
    }

    const metaFile = path.resolve(postRoot, `meta.json`)
    const timestamp = `${Date.now()}`
    const metaContent = fs.readFileSync(metaFile, "utf8")
    const meta = JSON.parse(metaContent)

    const { hash, size } = await _pushDirToMesh(postRoot)

    meta.published = meta.published || []
    meta.published.push({ timestamp, hash, size })

    fs.writeFileSync(metaFile, JSON.stringify({ ...meta, draft: false, timestamp }, null, 2), 'utf8')

    await send({ 
        id: data.id,
        type: 'publishPost'
    })
}

export const savePostDraft = async (data: any) => {
    system.reload()
    const env = system.env()

    const draftId = data.post.id || nanoid()
    const postRoot = path.resolve(env.posts.path, draftId)
    env.posts.exists || fs.mkdirpSync(env.posts.path)
    fs.existsSync(postRoot) || fs.mkdirpSync(postRoot)

    const htmlFilename = path.resolve(postRoot, `text.html`)
    const metaFilename = path.resolve(postRoot, `meta.json`)
    const timestamp = `${Date.now()}`

    fs.writeFileSync(htmlFilename, data.post.text || "", 'utf8')
    fs.writeFileSync(metaFilename, JSON.stringify({ ...data.post, draft: true, timestamp }, null, 2), 'utf8')

    await send({ 
        id: data.id,
        timestamp,
        type: 'savePostDraft',
        draftId
    })
}
