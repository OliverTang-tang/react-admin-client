/*
 包含应用中所有接口请求函数模块
每个函数的返回值都是promis
  */
import jsonp from 'jsonp'
import {message} from "antd";
import ajax from './ajax'
const BASE = ''
//登录接口
/*export function reqLogin(username,password) {
   return  ajax('/login',{username,password},'POST')
}*/
export const reqLogin=(username,password)=>ajax(BASE+'/login/user',{username,password},'POST')
//添加用户
export const reqAddUser=(user)=>ajax(BASE+'/manage/user/add',user,'POST')

export const reqWeather = (city) =>{
    return new Promise((resolve,reject) =>{
        const url = `https://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
        jsonp(url,{},(err,data)=>{
            console.log('jsonp',err,data);
            if(!err && data.status === 'success'){
                const {dayPictureUrl,weather} = data.results[0].weather_data[0]
                resolve({dayPictureUrl,weather});
            }else{
                message.error('获取天气信息失败!');
            }
        });
    })

}