/*
 包含应用中所有接口请求函数模块
每个函数的返回值都是promis
  */
import ajax from './ajax'
const BASE = ''
//登录接口
/*export function reqLogin(username,password) {
   return  ajax('/login',{username,password},'POST')
}*/
export const reqLogin=(username,password)=>ajax(BASE+'/login/user',{username,password},'POST')
//添加用户
export const reqAddUser=(user)=>ajax(BASE+'/manage/user/add',user,'POST')
