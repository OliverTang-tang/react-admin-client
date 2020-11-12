import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    TeamOutlined,
    PieChartOutlined,
    UserOutlined,
    DashboardOutlined,
    BarChartOutlined,
    LineChartOutlined,
    TransactionOutlined,
    WalletOutlined,
    NotificationOutlined
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
        icon: <TransactionOutlined />,
        children:[
            {
                title:'品类管理',
                key:'/category',
                icon: <NotificationOutlined />
            },
            {
                title:'商品管理',
                key:'/product',
                icon: <WalletOutlined />
            },
        ]
    },
    {
        title:'用户管理',
        key:'/user',
        icon: <UserOutlined />
    },
    {
        title:'角色管理',
        key:'/role',
        icon: <TeamOutlined />
    },
    {
        title:'图形展示',
        key:'/charts',
        icon: <DashboardOutlined />,
        children:[
            {
                title:'饼图',
                key:'/charts/pie',
                icon:  <PieChartOutlined/>
            },
            {
                title:'折线图',
                key:'/charts/line',
                icon: <LineChartOutlined />
            },
            {
                title:'圆柱图',
                key:'/charts/bar',
                icon: <BarChartOutlined />
            }
        ]
    }
]

export default menuConfig