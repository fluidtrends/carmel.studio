import React, { useState, useEffect } from 'react'
import { MainHeaderComponentProps, State } from '../types'
import { Layout, Radio, Tag, Dropdown, Typography, Tabs, Badge, Spin, Menu, Button } from 'antd'
import { useDispatch, useSelector } from "react-redux"
import { replace } from 'connected-react-router'
import { useEvent } from '../hooks'
import { UserCircleIcon, ChevronDownIcon, CreditCardIcon, LockOpenIcon, LockClosedIcon, KeyIcon, IdentificationIcon, CogIcon } from '@heroicons/react/solid'

import { 
  UserOutlined, 
  WalletOutlined, 
  SolutionOutlined, 
  LockOutlined,
  UnlockOutlined,
  SyncOutlined,
  SettingOutlined,
  CaretDownOutlined, 
  NotificationOutlined,
  FolderOutlined
} from '@ant-design/icons'
const { tw } = require('twind')

const { Header, Content, Sider } = Layout
const { TabPane } = Tabs;
const { SubMenu } = Menu;

const { Title } = Typography

/**
 * 
 * @param props 
 */
export const MainHeader: React.FC<MainHeaderComponentProps> = (props) => {
  const [section, setSection] = useState("products")
  const dispatch = useDispatch()
  const session = useSelector((state: State) => state.session)
  const s = useSelector((state: State) => state)
  const browser: any = useEvent()

  console.log("SSSS", s)

  const notifications: any = {
      carmel: [],
      main: [],
      user: []
  }
      
    // const onSectionChanged = (e: any) => {
    //   const s = e.target.value
    //   setSection(s)
    //   // switch (s) {
    //   //   case "products":
    //   //     dispatch(replace(session.productId ? '/product' : '/products'))  
    //   //     break
    //   //   case "content":
    //   //     browser.send({ type: 'hideWebPreview' })
    //   //     dispatch(replace(`/content`))  
    //   //     break
    //   //   }
    // }

    // const onSettings = (e: any) => {
    //   browser.send({ type: 'hideWebPreview' })
    //   dispatch(replace(`/settings`))  
    // }

    // const onVault = (e: any) => {
    //   browser.send({ type: 'hideWebPreview' })
    //   dispatch(replace(`/vault`))  
    // }

    const onAccountSelect = (e: any) => {
        const { key } = e
        browser.send({ type: 'hideWebPreview' })
        dispatch(replace(`/${key}`))  
    }

    // const onContent = (e: any) => {
    //   browser.send({ type: 'hideWebPreview' })
    //   dispatch(replace(`/content`))  
    // }

    const asset = (id: string) => require(`../../../assets/${id}`).default

    const MENUITEMS = [{
      title: "Profile",
      icon: IdentificationIcon,
      id: "profile",
      link: "/profile"
    },
    {
      title: "Wallet",
      icon: CreditCardIcon,
      id: "wallet",
      link: "/profile"
    },
    {
      title: "Vault",
      icon: KeyIcon,
      id: "vault",
      link: "/profile"
    }, 
    {
      title: "Settings",
      icon: CogIcon,
      id: "settings",
      link: "/settings"
    }]
    
    const onUserDropdownSelect = (e: any) => {
      dispatch(replace(e.link))
    }

    const renderUserDropdown = () => (
        <div className={tw("p-10")}>
          <div className={tw("dropdown inline-block relative")}>
            <button className={tw("bg-white text-primary font-semibold py-2 px-4 border-1 hover:bg-primary hover:text-white border-primary rounded inline-flex items-center")}>
              <UserCircleIcon className={tw("h-5 w-5 mr-2")}/>
              <span className={tw("mr-1")}>{ session.identity.username }</span>
              <ChevronDownIcon className={tw("h-5 w-5 ml-2")}/>
            </button>
            <ul className={tw("dropdown-menu absolute hidden text-gray-400 pt-1 w-full")}>
              { MENUITEMS.map((item: any, i: number) => 
                  <li className={tw("w-full")} key={i}>
                    <a onClick={() => onUserDropdownSelect(item)} className={tw(`${i === 0 || i === MENUITEMS.length - 1 ? 'rounded-t': ''} w-full pl-2 bg-white hover:bg-primary-100 py-2 block whitespace-no-wrap hover:text-primary flex flex-row`)}>
                      <item.icon className={tw("h-5 w-5 mr-2")}/>
                      { item.title }
                    </a>
                  </li>
              )}
            </ul>
          </div>
      </div>
    )

    const accountMenu = <Menu onClick={onAccountSelect}>
      { session && session.identity && <Menu.Item key="profile" icon={<SolutionOutlined />}>
        Your Profile
      </Menu.Item> }
      { (!session || !session.identity) && <Menu.Item key="login" icon={<UserOutlined />}>
       Login
      </Menu.Item>}
      { (!session || !session.identity) && <Menu.Divider/>}
      { (!session || !session.identity) && <Menu.Item key="register">
        <Button type="primary">Sign Up</Button>
      </Menu.Item> }
    </Menu>

    // const renderMainMenu = () => (
    //   <div style={{
    //     display: "flex",
    //     flex: 10,
    //     justifyContent: "center"
    //     }}>
    //         <Radio.Group size="large" value={section} onChange={onSectionChanged} buttonStyle="solid">
    //         <Radio.Button value="products">Products</Radio.Button>
    //         <Radio.Button value="content">Content</Radio.Button>
    //         </Radio.Group>
    //     </div>
    // )

  //  { session && session.user ? session.user.plan_name && session.user.plan_name !== "free" && <Tag color="green" style={{margin: 10}}> { session.user.plan_name.split('.')[0].toUpperCase() } </Tag> }

  const renderUserMenu = () => {
    return (<Dropdown overlay={accountMenu}>
            <Badge count={notifications.user.length} overflowCount={5} offset={[0, 2]}>
              <Button icon={<UserOutlined/>} size='large' style={{
                  marginLeft: 10
                }}>
                  { session && session.identity ? session.identity.username : ""} 
                  <CaretDownOutlined/>
              </Button>
            </Badge>
        </Dropdown>)
  }

  console.log(session)
  return (<div style={{ 
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    width: "100%",
    backgroundColor: "#ffffff",
    boxShadow: "0px 1px 5px #c1c1c1",
    margin: "0px 0px 10px 0px",
  }}>
     <div style={{ 
        padding: 20,
        display: "flex",
        flex: 1,
        flexDirection: "row",
        margin: 0,
        width: "100%",
    }}>
        <div style={{
          display: "flex",
          flex: 1,
          justifyContent: "flex-start"
        }}>
          <img src={asset('icon-32.png')} style={{
            width: 28, height: 28 
          }}/>
        </div>
        <div style={{
          display: "flex",
          flex: 1,
          justifyContent: "flex-end"
        }}>
          { renderUserDropdown() }          
       </div>  
    </div>
  </div>)
}

{/* <Button icon={<SettingOutlined/>} size='large' onClick={onSettings} style={{
              marginLeft: 10,
              border: "none"
            }}>
          </Button>
          <Button icon={<LockOutlined/>} size='large' onClick={onVault} style={{
              marginLeft: 10,
              border: "none"
            }}>
          </Button> */}