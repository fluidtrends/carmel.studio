import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { PhotographIcon } from '@heroicons/react/solid'

const { tw } = require('twind')

export const PostListItem = (props: any) => {
    let title = (props ? props.title || "" : 'Untitled')
    let summary = (props ? props.summary || "" : '')
  
    summary = summary.length < 54 ? summary : summary.substring(0, 54) + " ..."
    title = title.length < 16 ? title : title.substring(0, 16) + " ..."
  
    const showPublished = props && props.tab === 1
    const isPublished = props && props.published 
    const status = (props && props.draft ? 'Draft' : 'Published')
    const timestamp = (props && props.timestamp ? moment(parseInt(props.timestamp)).fromNow() : "")
    const cover = (props && props.cover ? props.cover.content : false)
    const show = ((showPublished && isPublished) || (!showPublished && !isPublished))

    if (!show) {
      return <div key={props.index}/>
    }
    
    return (
      <div key={props.index} className={tw("transition duration-500 ease-in-out p-2 w-64 m-3 hover:-translate-y-1 hover:scale-110 ")}>
          <div onClick={() => props.onSelect (props)} className={tw("border-1 border-gray-200 hover:shadow-2xl shadow-md cursor-pointer rounded-md h-64 p-3 bg-white")}>
            <div className={tw("bg-white h-36 flex flex-col justify-center items-center")}>
                  { cover ? <img src={cover} className={tw("object-cover max-h-28 w-full mb-2")}/> : <PhotographIcon className={tw("h-32 w-32 text-gray-200")}/> } 
            </div>
            { timestamp && <h3 className={tw("text-gray-500 text-xs tracking-widest title-font mb-1")}> 
             { 'Updated' } { timestamp } </h3> 
            }
            <h2 className={tw("text-gray-900 title-font text-lg font-medium")}>{ title }</h2>
            <p className={tw("text-gray-700 text-sm")}>{ summary }</p>
          </div>
        </div>
    )
  }