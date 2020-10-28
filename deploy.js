//部署到rinkby网络
const Web3=require('web3');
const {interface,bytecode}=require('./compile');
const HDWalletProvider = require('truffle-hdwallet-provider');
const mnemonic = "panther scorpion battle custom soccer old useless parade live cereal renew fruit"; // 12 word mnemonic
const provider = new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/d902824d5e53489bb6022ca0f8bf7476");
const web3=new Web3(provider);
deploy = async ()=>{
    const  accounts = await web3.eth.getAccounts();
    //console.log("nihaowodezhanghushi"+accounts[0]);//0xEdb827b148DCBE9E14F03348475fA45650A7E1c5
    const result =await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
                data:bytecode,
                //arguments:['abc']
            }
        ).send({
            from:accounts[0],
            gas:'3000000'
        });
    console.log("address"+result.options.address);
    console.log('--------------------------');
    console.log(interface);

};
deploy();
