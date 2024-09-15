import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux"
const { tw } = require('twind')
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Stage, Circle, FastLayer, Layer, Rect, Line, Text } from 'react-konva';
import Konva from 'konva';
import * as Scroll from 'react-scroll';
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export const Map: React.FC<any> = (props) => {
  useEffect(() => {
  }, [])

  const cities = [{
    id: "main",
    color: "#00BCD4",
    patches: [{
        start: [0,0],
        end: [4,4]
    }, {
        start: [9, 9],
        end: [23, 23]
    }]
  }]

  const Square = ({ x, y, w, h, row, col, onClick }: any) => {
    let color = "#CFD8DC"
    let city = ""
    cities.map((c: any) => {
        c.patches.map((p: any) => {
            if (p.start[0] <= row && p.start[1] <= col && p.end[0] >= row && p.end[1] >= col) {
                color = c.color
                city = c
            }
        })
    })
    // transformsEnabled="position"
    // perfectDrawEnabled={false}

    if (col < 5) {
        console.log(x,y, row, col)
    }

    return <Rect
            x={x}
            y={y}
            width={w}
            height={h}
            onClick={() => onClick({ x, y, row, col, w, h, color, city })}
            fill={color}
        />
    }

    const pad = 5
    const size = 20
    const line = 4
    const layer = 2 * (size * line + pad * 3)

    const VLine = ({ col }: any) => {

        let color = "#CFD8DC"

        const x = col * size + pad

        return <Line
                transformsEnabled="position"
                perfectDrawEnabled={false}
                listening={false}
                x={x}
                y={pad}
                points={[x, pad, x + 1, layer]}
                stroke={color}
        /> 
    }
    
    const HLine = ({ row  }: any) => {
        let color = "#CFD8DC"

        const y = row * size + pad 

        return <Line
                transformsEnabled="position"
                perfectDrawEnabled={false}
                listening={false}
                x={pad}
                y={y}
                points={[pad, y, layer, y + 1]}
                stroke={color}
        />
   }

   const onClick = (props: any) => {
        console.log(props)
   }

   const GridLines = () => {
      let lines: any = []

      for (let i = 0; i <= line; i++) {
        // for (let j = 0; j < hTotal; j++) {
        //     const x = wSpace + i * (w + wSpace) 
        //     const y = hSpace + j * (h + hSpace)
            lines.push(<VLine col={i}/>)
            // lines.push(<Square x={x} y={y} row={j} col={i} w={w} h={h} onClick={onClick}/>)
        // }
      }

      for (let i = 0; i <= line; i++) {
        // for (let j = 0; j < hTotal; j++) {
        //     const x = wSpace + i * (w + wSpace) 
        //     const y = hSpace + j * (h + hSpace)
            lines.push(<HLine row={i}/>)
            // lines.push(<Square x={x} y={y} row={j} col={i} w={w} h={h} onClick={onClick}/>)
        // }
      }

      return lines
    
  }

  const Container = () => {
      return (<MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>)
  }

  return (<div className={tw("flex flex-col w-full justify-center items-center ml-4 border-1 border-gray-300 shadow-xl mt-4 mr-4 mb-4 bg-white overflow-x-scroll overflow-y-scroll")}>
  </div>)
}
