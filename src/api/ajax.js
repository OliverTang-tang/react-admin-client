/*能发送ajax请求的函数模块
* 封装axios库
  函数的返回值式promise对象
 1.优化 统一处理请求异常
    在外层包一个自己创建的promise对象
   在请求出错时，不reject（error），而是显示错误提示
 2.异步得到的不是response而是response.data
   在请求成功resolve时，resolve(response.data)
 * */
import axios from 'axios';
import {message} from "antd";
export default function ajax(url,data={},type='GET') {
    return new Promise(((resolve, reject) => {
        let promise;
        //1.执行异步ajax请求
        if(type=='GET')//发送get请求
        {
            promise=   axios.get(url,{
                params: data
            })
        }//发送post请求
        else {
            promise=  axios.post(url,data);
        }
        //2.成功了，调用resolve（value)
        promise.then(response=>{
            resolve(response.data)
            //3.失败了，不调用reject，而是提示异常信息
        }).catch(error=>{
            message.error("出错了！"+error.message)
        })

    }))

}
/*
if(type=='GET')//发送get请求
{
    return   axios.get(url,{
        params: data
    })
}//发送post请求
else {
    return axios.post(url,data);
}*/
