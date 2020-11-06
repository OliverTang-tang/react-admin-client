import React, {Component} from "react";
import './index.less'
import logo from '../../assets/images/Logo.jpg'
import {Link} from "react-router-dom";
import { Menu } from 'antd';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';
import menuList from "../../config/menuConfig";
const { SubMenu } = Menu;

/*左侧导航组件*/
export default class LeftNav extends Component{

    /*根据menu的数据数组生成对应的标签数组
       使用map加递归调用*/
    getMenuNodes = (menuList)=>{
        return menuList.map(item=>{
            {
                if(!item.children)
                {
                    return(
                        <Menu.Item key={item.key} icon={item.icon }>
                            <Link to={item.key}>{item.title}</Link>
                        </Menu.Item>
                    )
                }else {
                    return (
                        <SubMenu key={item.key} icon={item.icon} title={item.title}>
                            {this.getMenuNodes(item.children)}
                        </SubMenu>
                    )
                }
            }
        })
    }

    render() {
        return(
                <div to='/' className="left-nav">
                    <Link className="left-nav-header">
                        <img src={logo} alt="logo"/>
                        <h1>后台管理系统</h1>
                    </Link>
                    <Menu
                        mode="inline"
                        theme="dark"
                    >
                        {/*<Menu.Item key="/home" icon={<PieChartOutlined />}>
                            <Link to='/home'>首页</Link>
                        </Menu.Item>

                        <SubMenu key="sub1" icon={<MailOutlined />} title="交易">
                            <Menu.Item key="/product"><Link to='/product'>品类管理</Link></Menu.Item>
                            <Menu.Item key="/category"><Link to='/category'>商品管理</Link></Menu.Item>
                        </SubMenu>*/}

                       {/* <Menu.Item key="/user" icon={<PieChartOutlined />}>
                            <Link to='/user'>用户管理</Link>
                        </Menu.Item>

                        <Menu.Item key="/role" icon={<PieChartOutlined />}>
                            <Link to='/role'>角色管理</Link>
                        </Menu.Item>*/}
                        {
                            this.getMenuNodes(menuList)
                        }
                    </Menu>
                </div>


        )
    }

}