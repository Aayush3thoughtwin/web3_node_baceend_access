const Web3 = require('web3');
// importing web3 
const database = require('./db.js');
// importing our database which we define
const User = require('./sceama.js');
// importing our databse schema which tells which field we defined

const con = require('../build/contracts/ThoughtwinCoin.json')
// importing the our 'ABI file ' of our smart contract which help us to intract which web3.js


const web3 = new Web3(new Web3('wss://rinkeby.infura.io/ws/v3/26b83f62a0714ec39f534a035e96b270'));
// Creating instance of our Web3 lib. and connecting with 'Infura' address 
// console.log(web3);

let sContract = new web3.eth.Contract(con.abi, '0x62b5a9D46282f2b6B67A3e68DDf605438461882E');
// creating instance of our contract and passing arguments first arg. is our 'ABI file' and second is our smart contract address 
// console.log(sContract);

sContract.methods.name().call().then(console.log);
let tempAddress;
console.log(tempAddress,'we are here >>>>>>>>>>');


/* checking the available account address in data base
async function databaseAdd(){
    let DbUserAddress = await User.findOne();
    console.log('Address from database',DbUserAddress);
}
databaseAdd();
*/


sContract.events.Transfer({
}, async function (error, event) {
   
    tempAddress = (event.returnValues.from);
    console.log('Transaction account add.>>>> ',tempAddress)

    try{
        let DbUserAddress = await User.findOne({address: tempAddress});
        

        if(DbUserAddress.address ){ console.log('Database se address >>>.',DbUserAddress);

        sContract.methods.balanceOf(tempAddress).call().then((result) => {
DbUserAddress.twcbal = web3.utils.fromWei(result, 'ether')  
     DbUserAddress.save() }) 
}else{
    let userSchema = User()
    userSchema.address = tempAddress
    sContract.methods.balanceOf(tempAddress).call().then((result) => {
        userSchema.twcbal = web3.utils.fromWei(result, 'ether')  
        userSchema.save() })

}
       


    }
    catch(error){
        console.log('Error',error);
    }
})








