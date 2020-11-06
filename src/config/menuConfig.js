import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';
import React from "react";

const menuConfig=[
    {
        title:'首页',
        key:'/home',
        icon: <AppstoreOutlined/>
    },
    {
        title:'交易',
        key:'/products',
        icon: <PieChartOutlined/>,
        children:[
            {
                title:'品类管理',
                key:'/product',
                icon:  <MenuUnfoldOutlined/>
            },
            {
                title:'商品管理',
                key:'/category',
                icon: <MenuUnfoldOutlined/>
            }
        ]
    },
    {
        title:'用户管理',
        key:'/user',
        icon: <MenuUnfoldOutlined/>
    },
    {
        title:'角色管理',
        key:'/role',
        icon: <MenuUnfoldOutlined/>
    },
]

export default menuConfig