import React, { useEffect, useState } from 'react'
const { tw } = require('twind')

export const Button = ({ onUpload, change, Icon }: any) => {
    return (<div className={tw("")}>
          <a onClick={onUpload} className={tw("")}>
            <p className={tw(`flex flex-row bg-gray-400 rounded-md p-1 pr-2 text-white border-1 border-gray-300 border-1 hover:bg-white hover:text-primary hover:border-primary cursor-pointer`)}>
            <Icon className={tw("w-6 h-6")}/> 
               <span className={tw("font-medium ml-2")}>
                  { change ? 'Change' : 'Add'} Cover Image
                </span>
            </p>
         </a>
    </div>)
  }