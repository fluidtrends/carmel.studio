import React, { useEffect, useCallback, useState } from 'react'
import { Card, Typography, Button, Skeleton } from 'antd'
import * as Spinners from 'react-spinners'
import * as styles from '../styles'

const { tw } = require('twind')

const { Meta } = Card
const { Text, Title, Paragraph } = Typography

export const Loading: any = (props: any) => {
    const { message } = props
    const loaders = ['ClimbingBoxLoader', 'PacmanLoader', 'PuffLoader']

    return <div className={tw("w-full h-full flex flex-col justify-center items-center -mt-20")}>
    <div style={{ margin: 50 }}>
                <Spinners.ScaleLoader color="#03A9F4"/> 
            </div>
    </div>
}
