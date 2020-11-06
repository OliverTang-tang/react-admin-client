
import React, {Component} from 'react';
import './login.less'
import logo from '../../assets/images/Logo.jpg'
import { Form, Input, Button,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {reqLogin} from "../../api";
import {Redirect, withRouter} from "react-router-dom";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
/*登录的路由组件*/

class Login extends Component {
   // [form] = Form.useForm();

    // 通过 Ref 来获取 Form 实例
    // 同样的，你可以不使用createRef()方法而用this.refs.XXX也可以

    // 通过 Form 的 Submit监听 得到字段值
     onFinish = async values => {//提交表单且数据验证成功后回调事件
        console.log('Received values of form: ', values);
        const {username, password} = values;
        const result = await reqLogin(username, password);
        if(result.code==200)
        {
            message.success('登录成功')
            const user=result.data
            //保存user
            storageUtils.saveUser(user)
            this.props.history.replace("/")
        }
        else
            message.error('登录失败',result.data)

    };

     validatePwd = (rule, value) => {
        return new Promise(async (resolve, reject) => {
            if (!value) {
                await reject('密码必须输入')
            } else if (value.length < 4) {
                await reject('密码长度不能小于4位')
            } else if (value.length > 12) {
                await reject('密码长度不能大于于12位')
            } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                await reject('密码必须是英文、数字或下划线组成')
            } else {
                await resolve()
            }
        })
    }

    render() {
        // 通过 Form 的 Submit监听 得到字段值
        const user=storageUtils.getUser() ;
        console.log(user)
        alert(user)
        if(JSON.stringify(user)=="{}")
        {
            return (
                <div className="login">
                    <header className="login-header">
                        <img src={logo} alt="logo"/>
                        <h1>区块链项目：后台管理系统</h1>
                    </header>
                    <section className="login-content">
                        <h2 >用户登录</h2>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{remember: true}}
                            //onFinish={onFinish}
                            onFinish={this.onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[{required: true, message: '请输入您的用户名!'}]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="用户名"/>
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{ validator: this.validatePwd}]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon"/>}
                                    type="password"
                                    placeholder="密码"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </section>
                </div>
            );
        }
        return <Redirect to='/'/>
    }
}
/*const NormalLoginForm = () => {



    const [form] = Form.useForm();

    // 通过 Ref 来获取 Form 实例
    // 同样的，你可以不使用createRef()方法而用this.refs.XXX也可以

    // 通过 Form 的 Submit监听 得到字段值
    const onFinish = async values => {//提交表单且数据验证成功后回调事件
        console.log('Received values of form: ', values);
        const {username, password} = values;

            const response = await reqLogin(username, password);
            console.log('请求成功',response)
           const result=response.data;
            if(result.code==200)
            {
                message.success('登录成功')
               this.props.history.push("/")
            }
             else
                 message.error('登录失败',result.msg)

        /!*.then(response=>{
            console.log('成功了',response.data)
        }).catch(error=>{
            console.log('失败了',error)
        });*!/
    };

    const getValues= () => {
        // 得到 Form 实例
        const form = this.formRef.current
        // 使用 getFieldsValue 获取多个字段值
        const values = form.getFieldsValue(['username','password'])
        console.log(values)
    }

   const getValidateValues= async () => {
        const form = this.formRef.current
        // 使用 validateFields 获取验证后字段值
        try {
            const values = await form.validateFields(['username', 'password'])
            console.log(values)
        } catch (err) {
            console.log(err)
        }
    };

    // eslint-disable-next-line no-undef
 /!*   useEffect(() => {
        // Something like ajax call
        form.setFieldsValue({
            username: 'light',
        });
    }, []);*!/

    //输入密码验证
    const validatePwd = (rule, value) => {
        return new Promise(async (resolve, reject) => {
            if (!value) {
                await reject('密码必须输入')
            } else if (value.length < 4) {
                await reject('密码长度不能小于4位')
            } else if (value.length > 12) {
                await reject('密码长度不能大于于12位')
            } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                await reject('密码必须是英文、数字或下划线组成')
            } else {
                await resolve()
            }
        })
    }

    return(
    <Form
        name="normal_login"
        className="login-form"
        initialValues={{remember: true}}
        //onFinish={onFinish}
        onFinish={onFinish}
    >
        <Form.Item
            name="username"
            rules={[{required: true, message: '请输入您的用户名!'}]}
        >
            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="用户名"/>
        </Form.Item>

        <Form.Item
            name="password"
            rules={[{ validator: validatePwd}]}
        >
            <Input
                prefix={<LockOutlined className="site-form-item-icon"/>}
                type="password"
                placeholder="密码"
            />
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
                登录
            </Button>
            {/!*<Button type='link' onClick={getValues}>非 Submit 方式（不验证）</Button>*!/}
            {/!*<Button type='link' onClick={getValidateValues}>非 Submit 方式（验证）</Button>*!/}
        </Form.Item>
    </Form>
    )
}*/

export default withRouter(Login);
/*前台表单验证
2，收集表单输入数据*/
/*高阶函数*/