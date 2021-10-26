import React, { useEffect, useState } from 'react'
import { PlusCircleIcon, ArrowCircleLeftIcon, CloudUploadIcon, SaveIcon, UploadIcon } from '@heroicons/react/outline'

const { tw } = require('twind')

export const UploadButton = ({ onUpload, change }: any) => {
    return (<div className={tw("")}>
          <a onClick={onUpload} className={tw("")}>
            <p className={tw(`flex flex-row bg-gray-400 rounded-md p-1 pr-2 text-white border-1 border-gray-300 border-1 hover:bg-white hover:text-primary hover:border-primary cursor-pointer`)}>
            <UploadIcon className={tw("w-6 h-6")}/> 
               <span className={tw("font-medium ml-2")}>
                  { change ? 'Change' : 'Add'} Cover Image
                </span>
            </p>
         </a>
    </div>)
  }
  
export  const ActionButton = ({ onSelect }: any) => {
      return (<div className={tw("")}>
            <a onClick={onSelect} className={tw("")}>
              <p className={tw(`flex flex-row bg-primary rounded-md p-1 pr-2 text-white border-1 border-primary border-1 hover:bg-white hover:text-primary hover:border-primary cursor-pointer`)}>
              <PlusCircleIcon className={tw("w-6 h-6")}/> 
                 <span className={tw("font-medium ml-2")}>
                    New Post
                  </span>
              </p>
           </a>
      </div>)
  }
  
export const NewAction = ({ onNew }: any) => {
    return (<div className={tw("mr-4")}>
          <a onClick={onNew} className={tw("")}>
            <p className={tw(`flex flex-row bg-primary rounded-md p-1 pr-2 text-white border-1 border-primary border-1 hover:bg-white hover:text-primary hover:border-primary cursor-pointer`)}>
            <CloudUploadIcon className={tw("w-6 h-6")}/> 
               <span className={tw("font-medium ml-2")}>
                  New Post 
                </span>
            </p>
         </a>
    </div>)
  }
  
export const BackAction = ({ onBack, title }: any) => {
    return (<div className={tw("mr-4")}>
          <a onClick={onBack} className={tw("")}>
            <p className={tw(`flex flex-row bg-white rounded-md p-1 pr-2 text-gray-900 border-1 border-white hover:border-gray-800 cursor-pointer`)}>
            <ArrowCircleLeftIcon className={tw("w-6 h-6")}/> 
               <span className={tw("font-medium ml-2")}>
                  { title } 
                </span>
            </p>
         </a>
    </div>)
  }
  
export const PublishAction = ({ onPublish }: any) => {
    return (<div className={tw("mr-4")}>
          <a onClick={onPublish} className={tw("")}>
            <p className={tw(`flex flex-row bg-primary rounded-md p-1 pr-2 text-white border-1 border-primary border-1 hover:bg-white hover:text-primary hover:border-primary cursor-pointer`)}>
            <CloudUploadIcon className={tw("w-6 h-6")}/> 
               <span className={tw("font-medium ml-2")}>
                  Publish 
                </span>
            </p>
         </a>
    </div>)
}
  
export const SaveAction = ({ onSave }: any) => {
    return (<div className={tw("mr-4")}>
          <a onClick={onSave} className={tw("")}>
            <p className={tw(`flex flex-row bg-white rounded-md p-1 pr-2 text-primary border-1 border-primary border-1 hover:bg-primary-100 hover:text-primary hover:border-primary cursor-pointer`)}>
            <SaveIcon className={tw("w-6 h-6")}/> 
               <span className={tw("font-medium ml-2")}>
                  Save Draft
                </span>
            </p>
         </a>
    </div>)
  }