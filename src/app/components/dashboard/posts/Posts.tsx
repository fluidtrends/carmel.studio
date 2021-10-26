import React, { useEffect, useState } from 'react'
import { ContentState, EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import { useEvent } from '../../../hooks'
import { Loading } from '../../../components/Loading'
import { stateFromHTML } from 'draft-js-import-html'
import { PostDraft } from './Draft'
import { PostsList } from './List'
import { sort } from 'semver';

const { tw } = require('twind')

export const Posts: React.FC<any> = (props) => {
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [post, setPost] = useState<any>({})
  const [draft, setDraft] = useState(false)
  const saveEvent: any = useEvent()
  const publishEvent: any = useEvent()
  const fetchEvent: any = useEvent()
  const uploadCoverEvent: any = useEvent()
  const [editorState, setEditorState] = useState<any>(() => EditorState.createEmpty())

  const refreshPosts = () => {
    setLoading(true)
    fetchEvent.send({ type: 'getPosts' })
  }

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      refreshPosts()
    }, 500)
  }, [])

  useEffect(() => {
    if(!uploadCoverEvent.received.id) return
    
    const p: any = Object.assign({}, post)
    p.cover = p.cover || {}
    p.cover.content = uploadCoverEvent.received.coverData
    p.id = p.id || uploadCoverEvent.received.draftId
    setPost(p)
  }, [uploadCoverEvent.received])

  useEffect(() => {
   
    if(!fetchEvent.received.id) return

    const sorted = (fetchEvent.received.posts || []).sort((x: any, y: any) => {
      return y.timestamp - x.timestamp
    })

    setPosts(sorted)
    setLoading(false)
  }, [fetchEvent.received])

  useEffect(() => {
    if(!saveEvent.received.id) return

    const p: any = Object.assign({}, post)
    p.id = p.id || saveEvent.received.draftId
    setPost(p)
 
    props.showAlert({ title: "Saved", summary: "New Draft Revision" })

  }, [saveEvent.received])

  useEffect(() => {
    console.log(publishEvent)
    if(!publishEvent.received.id) return

    // const p: any = Object.assign({}, post)
    // p.id = p.id || saveEvent.received.draftId
    // setPost(p)
    
    props.showAlert({ title: "Published", summary: "Published to the Carmel Mesh" })
    onBackToPosts()
  }, [publishEvent.received])

  const convertContentToHTML = () => {
    const c = editorState.getCurrentContent()
    let currentContentAsHTML = convertToHTML(c)
    // const purified = DOMPurify.sanitize(`${currentContentAsHTML}`)
    const p: any = Object.assign({}, post)
    p.text = `${currentContentAsHTML}`
    setPost(p)
  }

  const handleEditorChange = (state: any) => {
    setEditorState(state)
    convertContentToHTML()
  }

  const onNew = () => {
    setPost({})   
    setEditorState(() => EditorState.createEmpty())
    setDraft(true)
  }

  const onBackToPosts = () => {
    setPost({})
    refreshPosts()
    setDraft(false)
  }

  const onSelectPost = (p: any) => {
    setEditorState(EditorState.createWithContent(stateFromHTML(p.text || "")))
    props.setTab(0)
    setPost(p)     
    setDraft(true)
  }

  const onTitleChange = (e: any) => {
    const p: any = Object.assign({}, post)
    p.title = e.target.value
    setPost(p)
  }

  const onSummaryChange = (e: any) => {
    const p: any = Object.assign({}, post)
    p.summary = e.target.value
    setPost(p)  
  }

  const onUploadDraftCover = () => {
    uploadCoverEvent.send({ type: 'uploadDraftCover', post })
  }

  const onSave = () => {
    const p = { ...post}
    delete p.cover 
    delete p.onSelect

    saveEvent.send({ type: 'savePostDraft', post: p })
  }

  const onPublish = () => {
    setLoading(false)

    const p = { ...post}
    delete p.cover 
    delete p.onSelect

    publishEvent.send({ type: 'publishPost', post: p })
  }

  if (draft) {
    return <PostDraft
        onBackToPosts={onBackToPosts}
        editorState={editorState}
        handleEditorChange={handleEditorChange}
        onUploadDraftCover={onUploadDraftCover}
        onTitleChange={onTitleChange}
        onSave={onSave}
        onSummaryChange={onSummaryChange}
        onPublish={onPublish}
        post={post}/>
  }

  if (loading) {
    return (<div className={tw("flex flex-col w-full")}>            
        <Loading/>
    </div>)
  }

  return <PostsList onNew={onNew} posts={posts} onSelect={onSelectPost} setTab={props.setTab} tab={props.tab}/>
}