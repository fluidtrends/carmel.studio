import React, { useState, useEffect } from 'react'
const { tw } = require('twind')

export const MainFooter: React.FC<any> = (props) => {
    return (
        <div className={tw("flex flex-row flex-grow-0 h-10 bg-white text-center text-xs items-center justify-center text-gray-400 border-gray-200 border-t-1")}>
            Carmel
        </div>
    )
}