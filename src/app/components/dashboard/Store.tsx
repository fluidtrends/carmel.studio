import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
const { tw } = require('twind')

export const Store: React.FC<any> = (props) => {
  useEffect(() => {
  }, [])

  return (<div className={tw("flex flex-row flex-grow w-full h-full p-10")}>
         Store
  </div>)
}
