pragma solidity ^0.4.17;

contract Lottery{
    address public manger;

    address[] public players;

    //构造方法，为管理员
    constructor() public{
        manger = msg.sender;
    }

    //获取管理员
    function getManger() public view returns(address){
        return manger;
    }

    //投注彩票--资金为1ether
    function enter() public payable{
        require(msg.value==1 ether);
        players.push(msg.sender);
    }

    //返回投资人
    function getMangers() public view returns(address[])
    {
        return players;
    }
    //返回账本资金

    function getAccountBalance() public view returns(uint){
        return this.balance;//ziduan
    }

    //返回投注人人数
    function getPalyers() public view returns(uint){
        return players.length;
    }
    //产生随机数
    function random() private returns(uint){//为了weilebaozhengzhongjianglv,shechengsiyou
        //block difficulty,time,players
        return uint(keccak256(block.difficulty,now,players));
    }
    //pick winner 此处有问题 不要有返回变量，返回变量用call调回即可 改进方法 定义一个address winner 全局变量即可
    function pickWinner() public onlyManagerCanCall returns(address){

        uint index=random()%getPalyers();
        address winner=players[index];
        players=new address[](0);//qingkongshuju
        winner.transfer(this.balance);
        return winner;
    }
    //退款机制，由管理员调用
    function refund() public onlyManagerCanCall{

        for(uint i=0;i<players.length;i++)
        {
            players[i].transfer(1 ether);//qingkong fanzhichongfudiaoyong
        }
        players=new address[](0);
    }

    //重复代码进行重构

    modifier onlyManagerCanCall()
    {
        require(msg.sender==manger);
        _;
    }


}

/*设计代码的时候考虑数值溢出的问题 assert问题判别出来*/