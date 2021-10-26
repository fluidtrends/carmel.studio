import React, { useEffect, Children, isValidElement, cloneElement, useState } from 'react'
import { MainContainerProps } from '../types'
import * as styles from '../styles'
import strings from '../strings.json'
import { Layout, Radio, Dropdown, Tabs, Badge, Spin, Menu, Button } from 'antd'
import { MainHeader, SideMenu, MainFooter } from '../components'
import { State } from '../types'
import { useSelector, useDispatch } from "react-redux"
import * as icons from '@heroicons/react/outline'

const { tw } = require('twind')
const { Header, Content, Sider } = Layout
const { TabPane } = Tabs;
const { SubMenu } = Menu;

const Channels = () => (
  <div className={tw("bg-indigo-darkest text-purple-lighter flex-none w-24 p-6 hidden block")}>
  <div className={tw("cursor-pointer mb-4")}>
      <div className={tw("bg-white h-12 w-12 flex items-center justify-center text-black text-2xl font-semibold rounded-lg mb-1 overflow-hidden")}>
          <img src="https://pbs.twimg.com/profile_images/895274026783866881/E1G1nNb0_400x400.jpg"/>
      </div>
      <div className={tw("text-center text-white opacity-50 text-sm")}>&#8984;1</div>
  </div>
  <div className={tw("cursor-pointer mb-4")}>
      <div className={tw("bg-indigo-lighter opacity-25 h-12 w-12 flex items-center justify-center text-black text-2xl font-semibold rounded-lg mb-1 overflow-hidden")}>
          L
      </div>
      <div className={tw("text-center text-white opacity-50 text-sm")}>&#8984;2</div>
  </div>
  <div className={tw("cursor-pointer")}>
      <div className={tw("bg-white opacity-25 h-12 w-12 flex items-center justify-center text-black text-2xl font-semibold rounded-lg mb-1 overflow-hidden")}>
      </div>
  </div>
</div>)

const Message = () => (
  <div className={tw("flex items-start mb-4 text-sm")}>
      <img src="https://pbs.twimg.com/profile_images/929910740156215296/yDEC9GW9_400x400.jpg" className={tw("w-10 h-10 rounded mr-3")} />
      <div className={tw("flex-1 overflow-hidden")}>
          <div>
              <span className={tw("font-bold")}>David Hemphill</span>
              <span className={tw("text-grey text-xs")}>12:46</span>
          </div>
          <p className={tw("text-black leading-normal")}><a href="#" className={tw("inline-block bg-blue-lightest text-blue no-underline")}>@Adam Wathan</a> the size of the generated CSS is creating a singularity in space/time, we must stop adding more utilities before it's too late!</p>
      </div>
</div>)

const Messages = () => (
  <div className={tw("px-6 py-4 flex-1 overflow-y-scroll")}>
    <Message/>
    <Message/>
    <Message/>
    <Message/>
    <Message/>
    <Message/>
    <Message/>
    <Message/>
    <Message/>
    <Message/>
    <Message/>
    <Message/>
    <Message/>
    <Message/>
    <Message/>
    <Message/>
    <Message/>
    <Message/>
    <Message/>
    <Message/>
  </div>
)

const SideSection = ({ title, onSelect, id, item, icon, section }: any) => {
  const Icon = icons[icon as keyof typeof icons]
  return (<div className={tw(`pl-4 mt-4 w-full bg-${section.id === id ? 'gray-200' : 'white'} mt-4 hover:text-gray-900 text-sm cursor-pointer inline-flex items-center hover:bg-gray-200 text-gray-700 p-1 rounded-xs`)} onClick={() => onSelect(item)}>
            <span className={tw("text-gray-700 w-4 h-4 mr-2 rounded-full")}>
                <Icon className={tw("")}/>
            </span> 
            { title }
  </div>)
}
const Sidebar = ({ onSelect, section, menu }: any) => (
  <div className={tw("bg-white h-screen shadow-2xl border-r-1 border-r-gray-200 flex-none w-32 block overflow-y-auto")}>
    { menu.map((m: any, i: number) => <SideSection {...m} item={menu[i]} onSelect={onSelect} section={section}/>) }
  </div>)

  const Heading = () => (
    <div className={tw("border-b flex px-6 py-2 items-center flex-none")}>
    <div className={tw("flex flex-col")}>
        <h3 className={tw("text-grey-darkest mb-1 font-extrabold")}>#general</h3>
        <div className={tw("text-grey-dark text-sm truncate")}>
            Chit-chattin' about ugly HTML and mixing of concerns.
        </div>
    </div>
    <div className={tw("ml-auto hidden md:block")}>
        <div className={tw("relative")}>
            <input type="search" placeholder="Search" className={tw("appearance-none border border-grey rounded-lg pl-8 pr-4 py-2")}/>
            <div className={tw("absolute pin-y pin-l pl-3 flex items-center justify-center")}>
            </div>
        </div>
    </div>
  </div>)

const ActionBar = () => (
  <div className={tw("p-3 flex-none bg-gray-100 border-1 border-gray-200 overflow-hidden")}>
  </div>
)

/**
 * 
 * @param props 
 */
export const Main: React.FC<any> = (props) => {
  const [section, setSection] = useState(props.menu[0])
  const [tab, setTab] = useState(0)

  const onChangedSection = (s: any) => {
    setTab(0)
    setSection(s)
  }

  const onChangedTab = (t: any) => {
    setTab(t)
  }

  const childrenWithProps = (children: any, props: any) => Children.map(children, child => {
    if (isValidElement(child)) {
      return cloneElement(child, { ...props });
    }
    return child;
  });

  return (<div className={tw("font-sans antialiased flex flex-col h-screen flex")}>
    <MainHeader />
    <div className={tw("flex flex-row bg-gray-100 overflow-hidden -mt-2")}>
      <Sidebar onSelect={onChangedSection} section={section} menu={props.menu}/>
      <div className={tw("flex flex-row w-full h-full bg-gray-100")}>      
           { childrenWithProps(props.children, { section, tab, setTab, onChangedTab }) }
      </div>
    </div>
  </div>)
}

