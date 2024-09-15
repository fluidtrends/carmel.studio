import React, { useEffect, useState } from 'react'

const { tw } = require('twind')
const asset = (id: string) => require(`../../../../assets/${id}`).default

export const Empty = ({ title, image }: any) => (
    <div className={tw("flex bg-gray-100 p-4 flex-col w-full h-screen overflow-y-scroll flex-wrap rounded items-center justify-center m-4")}>
        <img src={asset(image)} className={tw("w-auto h-80")}/>
        <span className={tw("text-sm m-4 text-gray-400")}>
          { title }
        </span>
    </div>
)