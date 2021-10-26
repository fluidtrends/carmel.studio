import React, { useEffect, useState } from 'react'
import { ActionButton, NewAction } from './Buttons'
import { PostListItem } from './ListItem'

const { tw } = require('twind')
const asset = (id: string) => require(`../../../../../assets/${id}`).default

const NoDrafts = ({ onSelect }: any) => (
    <div className={tw("flex p-4 shadow-2xl flex-col w-full h-screen overflow-y-scroll flex-wrap rounded items-center justify-center")}>
        <img src={asset('typewriter.png')} className={tw("w-auto h-80")}/>
        <span className={tw("text-sm m-4 text-gray-400")}>
          You have no current drafts. Write one up.
        </span>
        <ActionButton onSelect={onSelect}/>
    </div>
)

const NoPublished = ({ }: any) => (
  <div className={tw("flex bg-gray-100 p-4 shadow-2xl flex-col w-full h-screen overflow-y-scroll flex-wrap rounded items-center justify-center")}>
      <img src={asset('rocket.png')} className={tw("w-auto h-80")}/>
      <span className={tw("text-sm m-4 text-gray-400")}>
        You have no published posts.
      </span>
  </div>
)
  
export const PostsList = ({ posts, onNew, onSelect, tab }: any) => {
    const published = posts.filter((p: any) => !p.draft)
    const drafts = posts.filter((p: any) => p.draft)

    const showPublished = (tab === 1)
    const all = (showPublished ? published : drafts)
    
    if ((!all || all.length === 0)) {
      return (<div className={tw("flex flex-col w-full")}>            
             { showPublished ? <NoPublished/> :  <NoDrafts onSelect={onNew}/> }
        </div>)
    }

    return (<div className={tw("flex flex-col w-full p-4")}>      
             <div className={tw("flex p-4 shadow-2xl flex-row w-full border-b-1 border-gray-200 bg-white justify-end flex-wrap shadow-sm rounded mb-2")}>
                <NewAction onNew={onNew} />
            </div>      
            <div className={tw("flex flex-wrap w-full h-full pb-20 overflow-y-scroll ")}>            
              { all.map((p: any) => (<PostListItem tab={tab} {...p} onSelect={onSelect}/>))}
          </div>
      </div>)
  }