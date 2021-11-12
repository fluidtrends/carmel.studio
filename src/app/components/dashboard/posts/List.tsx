import React, { useEffect, useState } from 'react'
import { ActionButton, NewAction } from './Buttons'
import { PostListItem } from './ListItem'
import { Empty  } from '../Empty'

const { tw } = require('twind')

export const PostsList = ({ posts, onNew, onSelect, tab }: any) => {
    const published = posts.filter((p: any) => !p.draft)
    const drafts = posts.filter((p: any) => p.draft)

    const showPublished = (tab === 1)
    const all = (showPublished ? published : drafts)
    
    if ((!all || all.length === 0)) {
      return (<div className={tw("flex flex-col w-full")}>  
              <Empty image={showPublished ? 'no-published-posts.png' : 'no-draft-posts.png'} title={showPublished ? 'No published posts' : 'No drafts'}/>           
        </div>)
    }

    return (<div className={tw("flex flex-col w-full p-4")}>      
             <div className={tw("flex p-4 shadow-2xl flex-row w-full border-b-1 border-gray-200 bg-white justify-end flex-wrap shadow-sm rounded mb-2")}>
                <NewAction onNew={onNew} />
            </div>      
            <div className={tw("flex flex-wrap w-full h-full pb-20 overflow-y-scroll ")}>            
              { all.map((p: any, i: number) => (<PostListItem index={i} tab={tab} {...p} onSelect={onSelect}/>))}
          </div>
    </div>)
  }