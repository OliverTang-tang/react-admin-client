import React, {Component} from 'react';

import web3 from "./web3";
import lottery from "./lottery";
import {Button,message} from 'antd'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Login from "./pages/login/login";
import Admin from "./pages/admin/admin";


class  App extends  Component{

   state={manager:"",
         playersCounts:0,
         balance:0,
         disabled:true,
         loading:false,
         showButton:'none'
         };

    async componentDidMount()
    {
        const address=await lottery.methods.getManger().call();
        const playersCounts=await lottery.methods.getPalyers().call();
        const balance=await lottery.methods.getAccountBalance().call();
        this.setState({manager :address});
        this.setState({balance :web3.utils.fromWei(balance,'ether')});
        this.setState({playersCounts :playersCounts});
        const accounts= await web3.eth.getAccounts();
        if(accounts[0]==address)
        {
            this.setState({showButton:'inline'})
        }
        else {
            this.setState({showButton:'none'})
        };
    }

    enter = async ()=>{
        this.setState({loading:true});
      //  console.log(web3.currentProvider);
        const accounts=await web3.eth.getAccounts();
        //console.log(accounts);
        await lottery.methods.enter().send({
            from: accounts[0],
            value:'1000000000000000000'
        });
        this.setState({loading:false});
        window.location.reload(true);
    };

    pickWinner=async ()=>{
        this.setState({loading:true});
        const accounts=await web3.eth.getAccounts();
        await lottery.methods.pickWinner().send(
            {
                from: accounts[0],
            }
        )

        this.setState({loading:false});
        window.location.reload(true);
    };



    render (){
        return (<BrowserRouter>
            <Switch>{/*只匹配其中的一个*/}
            <Route path='/login' component={Login}></Route>
            <Route path='/' component={Admin}/>
            </Switch>
        </BrowserRouter> );
    }
}

export default App;
/*
1.展示管理员地址
2.展示奖池金额
3.展示参与人数
4.展示当前期数
5.展示投注按钮
6.展示开奖按钮（需要管理员界面才展现）
7.展示退款按钮（需要管理员界面才展现）
*/
/*semantic react ui*/