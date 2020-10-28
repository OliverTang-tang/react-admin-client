import React, {Component} from 'react';
import {Message, Container, Card, Image, Icon, Statistic, Button, CardGroup,Label} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import web3 from "./web3";
import lottery from "./lottery";


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
        return(
        console.log(web3.version),
            <div>
                <Container>
                    <br/>
                    <Message info>
                        <Message.Header>区块链彩票项目</Message.Header>
                        <p>以小博大，别墅靠海</p>
                    </Message>
                    <CardGroup>
                        <Card>
                            <Image src='/images/download.png' wrapped ui={false}/>
                            <Card.Content>
                                <Card.Header>六合彩</Card.Header>
                                <Card.Meta>
                                    <p>管理员地址:</p>
                                    <Label size='mini'>
                                        {this.state.manager}
                                    </Label>
                                    <span className='date'></span>
                                </Card.Meta>
                                <Card.Description>
                                    每周三晚上8.准时开奖
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <a>
                                    <Icon name='user'/>
                                   {this.state.playersCounts}
                                </a>
                            </Card.Content>
                            <Card.Content extra>
                                <Statistic color='red'>
                                    <Statistic.Value>{this.state.balance} ether</Statistic.Value>
                                </Statistic>
                            </Card.Content>
                            <Button animated='fade' onClick={this.enter}  loading={this.state.loading}  >
                                <Button.Content visible>买定离手，未来可期</Button.Content>
                                <Button.Content hidden>谨慎对待</Button.Content>
                            </Button>
                            <Button color='red' style={{display: this.state.showButton}} onClick={this.pickWinner}>开奖</Button>
                            <Button color='orange' style={{display:this.state.showButton}}>退款</Button>
                        </Card>
                    </CardGroup>
                </Container>
            </div>
        );}
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