import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
const { tw } = require('twind')

export const Messages: React.FC<any> = (props) => {
  useEffect(() => {
  }, [])

  return (<div className={tw("flex flex-col w-full justify-center items-center ml-4 border-1 border-gray-300 shadow-xl mt-4 mr-4 mb-4 bg-white overflow-x-scroll overflow-y-scroll")}>
  </div>)
}
