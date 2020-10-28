//编译
const path=require('path');
const fs=require('fs');
const solc=require('solc');

const srcpath = path.resolve(__dirname,'contracts','Lottery.sol');
//console.log(srcpath);读出地址
const source = fs.readFileSync(srcpath,'utf-8');
//console.log(source);打印出智能合约，读出来了
const result=solc.compile(source,1);
//console.log(result);
//暴露信息
module.exports=result.contracts[':Lottery'];