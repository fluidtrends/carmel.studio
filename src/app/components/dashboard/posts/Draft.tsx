import React, { useEffect, useState } from 'react'
import { UploadButton, BackAction, SaveAction, PublishAction } from './Buttons'
import { Editor } from "react-draft-wysiwyg";
import { ContentState, EditorState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const { tw } = require('twind')

const DraftMeta = ({ onSummaryChange, onTitleChange, post }: any) => {
    const title = post ? post.title : ""
    const summary = post ? post.summary : ""
    
    return (<div className={tw("bg-white p-2 h-60 w-full mx-auto flex")}>
    <div className={tw("bg-white rounded-lg flex flex-col w-full relative")}>
      <div className={tw("")}>
        <label className={tw("leading-7 text-sm text-gray-600")}>Title</label>
        <input defaultValue={ title || ""} onChange={onTitleChange} className={tw("w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out")}/>
      </div>
      <div className={tw("")}>
        <label className={tw("leading-7 text-sm text-gray-600")}>Summary</label>
        <textarea defaultValue={ summary || "" } onChange={onSummaryChange} className={tw("w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out")}></textarea>
      </div>
    </div>
  </div>)
}
  
const DraftCover = ({ onUpload, post }: any) => {
    if (post && post.cover && post.cover.content) {
      return (<div className={tw("bg-white p-4 h-60 w-full border-l-1 border-gray-200")}>
      <div className={tw("h-full justify-center flex flex-col items-center p-4")}>
          <img src={post.cover.content} className={tw("object-contain h-48 w-full mb-4")}/>
          <UploadButton onUpload={onUpload} change/>
      </div>
    </div>)
    }
  
    return (<div className={tw("bg-white p-4 h-60 w-full border-l-1 border-gray-300")}>
      <div className={tw("h-full justify-center flex flex-col items-center m-4")}>
          <UploadButton onUpload={onUpload}/>
      </div>
    </div>)
}
  
const DraftHeader = (props: any) => {
    return (<div className={tw("bg-white rounded-sm p-2 flex flex-col w-full relative z-10 shadow-md h-80 mb-2")}>
      <div className={tw("h-full justify-center flex flex-row items-center")}>
        <div className={tw("bg-white h-full m-4 justify-center w-1/2 flex flex-row items-center")}>
            <DraftMeta {...props} />
        </div>
        <div className={tw("bg-white h-full m-4 justify-center w-1/2 flex flex-row items-center")}>
            <DraftCover {...props} />
        </div>
      </div>
    </div>)
  }
  
const DraftEditor = ({ state, onChange, post }: any) => {
      return (<div className={tw("h-full shadow-md ")}>
        <Editor 
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          editorState={state} 
          onEditorStateChange={onChange}/>
      </div>)
}

export const PostDraft = ({ onBackToPosts, editorState, handleEditorChange, onUploadDraftCover, onTitleChange, onSave, onSummaryChange, onPublish, post }: any) => {
    return (<div className={tw("flex flex-col w-full")}>      
    <div className={tw("flex p-4 shadow-2xl flex-row w-full border-b-1 border-gray-200 bg-white justify-start flex-wrap shadow-sm rounded mb-2")}>       
       <div className={tw("flex flex-row justify-left w-1/2")}>       
         <BackAction onBack={onBackToPosts} title="Back to Posts"/>
       </div>      
       <div className={tw("flex flex-row justify-end w-1/2")}>       
         <SaveAction onSave={onSave} />
         <PublishAction onPublish={onPublish}/>
       </div> 
     </div>           
     <DraftHeader post={post} onUpload={onUploadDraftCover} onTitleChange={onTitleChange} onSummaryChange={onSummaryChange}/>
     <DraftEditor post={post} state={editorState} onChange={handleEditorChange}/>
</div>)
}
  
  