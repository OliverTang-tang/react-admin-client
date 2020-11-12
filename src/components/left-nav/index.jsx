import React, {Component} from "react";
import './index.less'
import logo from '../../assets/images/Logo.jpg'
import {Link,withRouter} from "react-router-dom";
import { Menu } from 'antd';
import menuList from "../../config/menuConfig";
const { SubMenu } = Menu;

/*左侧导航组件*/
class LeftNav extends Component{

    /*根据menu的数据数组生成对应的标签数组
       使用map加递归调用*/
   /* getMenuNodes = (menuList)=>{
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
    }*/
    /*reduce+递归调用*/
    getMenuNodes = (menuList)=>{
        //得到当前的路径
        const path=this.props.location.pathname
        return menuList.reduce((pre,item)=>{
            if(!item.children)
            {
                pre.push((<Menu.Item key={item.key} icon={item.icon }>
                    <Link to={item.key}>{item.title}</Link>
                </Menu.Item>))
            }else {
                //查找一个与当前请求路径匹配的子item
                const cItem=item.children.find(cItem=>cItem.key==path)
                //如果存在，说明当前的item的子列表需要打开
                if(cItem)
                    this.openKey=item.key

                pre.push((
                    <SubMenu key={item.key} icon={item.icon} title={item.title}>
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                ))
            }
            return pre
        },[])
    }
    //在第一次render之前执行一次，为第一个render做准备（同步的）
    componentWillMount() {
        this.menuNodes=this.getMenuNodes(menuList)
    }

    render() {
        const path=this.props.location.pathname
        console.log("this.render()",path)
        //得到需要打开菜单项的key
        const openKey=this.openKey
        return(
                <div  className="left-nav">
                    <Link to='/' className="left-nav-header">
                        <img src={logo} alt="logo"/>
                        <h1>后台管理系统</h1>
                    </Link>
                    <Menu
                        mode="inline"
                        theme="dark"
                        selectedKeys={[path]}
                        defaultOpenKeys={[openKey]}
                    >
                        {
                            this.menuNodes
                        }
                    </Menu>
                </div>


        )
    }

}
export default withRouter(LeftNav);