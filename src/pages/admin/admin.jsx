/**
 * Created by mqd on 2020/10/29.
 */
/*后台管理路由组件*/
import React, {Component} from 'react';
import memoryUtils from "../../utils/memoryUtils";
import {Redirect, Route,Switch} from 'react-router-dom'
import {Layout} from "antd";
import LeftNav from "../../components/left-nav";
import Header from "../../components/header-nav";
//引入子路由在component中
import Home from "../home/home";
import Category from "../category/category";
import Product from "../product/product";
import Role from "../role/role";
import Users from "../user/user";
import Bar from "../charts/bar";
import Pie from "../charts/pie";
import Line from "../charts/line";


const {  Footer, Sider, Content } = Layout;
export default class Admin extends Component {
    render() {
        const user = memoryUtils.user;
        //如果内存中没有存储user==>当前没有登录
        if(!user)
            //自动跳转到登录界面
            return <Redirect to="/login"/>
        return (
            <Layout style={{height : '100%'}}>
                <Sider><LeftNav/></Sider>
                <Layout >
                    <Header>Header</Header>
                    <Content style={{margin:20 , backgroundColor:'#fff'}}>
                        <Switch>
                            <Route path='/home' component={Home}/>
                            <Route path='/category' component={Category}/>
                            <Route path='/product' component={Product}/>
                            <Route path='/role' component={Role}/>
                            <Route path='/user' component={Users}/>
                            <Route path='/charts/bar' component={Bar}/>
                            <Route path='/charts/line' component={Line}/>
                            <Route path='/charts/pie' component={Pie}/>
                            <Redirect to='/home'/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:"center",color:"#ccccccc"}}>连接更加美好的未来</Footer>
                </Layout>
            </Layout>



        );
    }
}