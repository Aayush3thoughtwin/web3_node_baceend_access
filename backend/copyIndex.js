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
// calling the name method which return us name of CONTRACT

// sContract.methods.balanceOf('0x378367eb35a793817aD92ae055394E4A6CF1A0FF').call().then((result)=> console.log(web3.utils.fromWei(result,"ether")));
// balance of method return us the balance of the dedicated address 


sContract.events.Transfer({
}, async function (error, event) {
   
    tempAddress = (event.returnValues.from);
    console.log('Transaction account add.>>>> ',tempAddress)

    try{
        let DbUserAddress = await User.findOne({address: tempAddress});

        if (tempAddress === DbUserAddress.address){

            console.log('Database se address >>>.',DbUserAddress);

            sContract.methods.balanceOf(tempAddress).call().then((result) => {
            DbUserAddress.twcbal = web3.utils.fromWei(result, 'ether')  
            DbUserAddress.save() }) ;
            }

        else{
            let InNewUserAddress = await User();

            console.log('NEW INSERTED ADDRESS',InNewUserAddress);

            sContract.methods.balanceOf(tempAddress).call().then((result) => 
            { 
                console.log('ELSE CONDITION result >>>>>',result);
                   
                    // userAddressSchema.address = temp;

                InNewUserAddress.twcbal = (web3.utils.fromWei(result, 'ether'));
                InNewUserAddress.save()

                });

        };
    }catch(error){
        console.log('Error',error);
    }

});




//  User.find().then(res =>{
// //     console.log("res",res);

// // }).catch(err =>{
// //     console.log("err",err);

// // })

// async function hello(error, event) {

//     let userAddress = await User.find();



//     for (let i = 0; i < userAddress.length; i++) {

//         console.log("for address", userAddress[i].address)
//         // if (address !== userAddress[i].address)
//         // {
//         //     userAddress[i].address = address;

//         //     sContract.methods.balanceOf(address).call().then((result)=>{
//         //         console.log(result)
//         //         userAddress.twcbal=(web3.utils.fromWei(result,'ether'));
//         //         userAddress[i].save()

//         //        })
//         // }
//         // else{

//         //     sContract.methods.balanceOf(address).call().then((result)=>{
//         //         console.log(result)
//         //         User.findOneAndUpdate(address===userAddress[i].address,{

//         //             address :address,
//         //             twcbal : (web3.utils.fromWei(result,'ether'))

//         //         })

//         //        })
//         // }

//     }    // console.log(userAddress)
// }
// hello()

// sContract.events.Transfer({

// }, async function (error, event) {

//     let userAddress = await User.find();
//     console.log('here is you')
//     console.log("userAddress see", userAddress);
//     let address = (event.returnValues.from)
//     let bal = 0;
//     let temp;
//     for (let i = 0; i < userAddress.length; i++) {
//         console.log(userAddress)
//         if (address !== userAddress[i].address) {
//             temp = address;

//         }


//     }    // console.log(userAddress)

//     if (temp === address) {
//         console.log(" IF CONDITION")
//         let userAddressSchema = User.findOne({
//             address: address
//         }).then(res => {
//             if (res) {
//                 console.log("res>>>>>>>", res);
//                 User.findOneAndUpdate({ address: res.address, }, { twcbal: (web3.utils.fromWei(result, 'ether')) }).then(result => {
//                     console.log("result>>>>>", result)
//                 }).catch(error => {
//                     console.log("error>>>>>", error)

//                 })
//             } else {
//                 console.log("else error");
//             }

//         })
//     } else 
//     {
//         console.log("ELSE CONDITION")


//         let userAddressSchema = User();

//         sContract.methods.balanceOf(address).call().then((result) => 
//         {
//             console.log(result)
//             userAddressSchema.address = temp;

//             userAddressSchema.twcbal = (web3.utils.fromWei(result, 'ether'));
//             userAddressSchema.save()

//         })

//     }






//     // sContract.methods.balanceOf(address).call().then(async(result)=>{
//     //     User.findOneAndUpdate({address:address,}, {twcbal:(web3.utils.fromWei(result,'ether'))})
//     //     console.log(result)



//     //    })
//     // }


// })

//     // console.log(event.returnValues.from);

// // .on("connected", function(subscriptionId){
// //     console.log(subscriptionId);
// // })
// // .on('data', function(event){
// //     console.log(event); // same results as the optional callback above
// // })
// // .on('changed', function(event){
// //     // remove event from local database
// // })
// // .on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
// // });

// // da=[
// //     user1={
// //     addresses:"drtgrdyrdydyrd", 
// //     twcbal:0
// //     }
// // ]
// // async function userBalup(){

// // }



// // const Web3 = require('web3');
// // // importing web3 
// // const database = require('./db.js');
// // // importing our database which we define
// // const User = require('./sceama.js');
// // // importing our databse schema which tells which field we defined

// // const con = require('../build/contracts/ThoughtwinCoin.json')
// // // importing the our 'ABI file ' of our smart contract which help us to intract which web3.js


// // const web3 = new Web3(new Web3('wss://rinkeby.infura.io/ws/v3/26b83f62a0714ec39f534a035e96b270'));
// // // Creating instance of our Web3 lib. and connecting with 'Infura' address 
// // // console.log(web3);

// // let sContract = new web3.eth.Contract(con.abi, '0x62b5a9D46282f2b6B67A3e68DDf605438461882E');
// // // creating instance of our contract and passing arguments first arg. is our 'ABI file' and second is our smart contract address 
// // // console.log(sContract);

// // sContract.methods.name().call().then(console.log);
// // let tempAddress;
// // console.log('we are here >>>>>>>>>>');


// // /* checking the available account address in data base
// // async function databaseAdd(){
// //     let DbUserAddress = await User.find();
// //     console.log('Address from database',DbUserAddress);
// // }
// // databaseAdd();
// // */


// // sContract.events.Transfer({
// // }, async function (error, event) {
// //     tempAddress = (event.returnValues.from);
// //     console.log('Transaction account add.>>>> ',tempAddress)

// //     try{
// //         let DbUserAddress = await User.find({tempAddress: tempAddress});
// //         console.log('Database se address>>>.',DbUserAddress);
    
// //         if (tempAddress === DbUserAddress){
// //             User.findOneAndUpdate({ twcbal: (web3.utils.fromWei(result, 'ether')) }).then(result => {
// //                 console.log("IF CONDITION result>>>>>", result)
// //             }).catch(error => {
// //                 console.log("IF CONDITION error>>>>>", error)

// //             });

// //         }else{
// //             let InNewUserAddress = await User();
// //             console.log('NEW INSERTED ADDRESS',InNewUserAddress);
// //             sContract.methods.balanceOf(tempAddress).call().then((result) => 
// //             { 
// //                 console.log('ELSE CONDITION result>>>>>',result);
                   
// //                     // userAddressSchema.address = temp;

// //                 InNewUserAddress.twcbal = (web3.utils.fromWei(result, 'ether'));
// //                 InNewUserAddress.save()

// //                 });

// //         };
// //     }
// //     catch(error){
// //         console.log('Error',error);
// //     }
// // })











// const Web3 = require('web3');
// // importing web3 
// const database = require('./db.js');
// // importing our database which we define
// const User = require('./sceama.js');
// // importing our databse schema which tells which field we defined

// const con = require('../build/contracts/ThoughtwinCoin.json')
// // importing the our 'ABI file ' of our smart contract which help us to intract which web3.js


// const web3 = new Web3(new Web3('wss://rinkeby.infura.io/ws/v3/26b83f62a0714ec39f534a035e96b270'));
// // Creating instance of our Web3 lib. and connecting with 'Infura' address 
// // console.log(web3);

// let sContract = new web3.eth.Contract(con.abi, '0x62b5a9D46282f2b6B67A3e68DDf605438461882E');
// // creating instance of our contract and passing arguments first arg. is our 'ABI file' and second is our smart contract address 
// // console.log(sContract);

// sContract.methods.name().call().then(console.log);
// let tempAddress;
// console.log(tempAddress,'we are here >>>>>>>>>>');


// /* checking the available account address in data base
// async function databaseAdd(){
//     let DbUserAddress = await User.findOne();
//     console.log('Address from database',DbUserAddress);
// }
// databaseAdd();
// */


// sContract.events.Transfer({
// }, async function (error, event) {
   
//     tempAddress = (event.returnValues.from);
//     console.log('Transaction account add.>>>> ',tempAddress)

//     try{
//         let DbUserAddress = await User.findOne({address: tempAddress});
        

// //         if(DbUserAddress.address === tempAddress )
// //         { console.log('Database se address >>>.',DbUserAddress);

// //         sContract.methods.balanceOf(tempAddress).call().then((result) => {
// // DbUserAddress.twcbal = web3.utils.fromWei(result, 'ether')  
// //      DbUserAddress.save() }) 
// // }else{
// //     let userSchema = User()
// //     userSchema.address = tempAddress
// //     sContract.methods.balanceOf(tempAddress).call().then((result) => {
// //         userSchema.twcbal = web3.utils.fromWei(result, 'ether')  
// //         userSchema.save() })

// }
       


//         if (tempAddress === DbUserAddress.address){
//             sContract.methods.balanceOf(tempAddress).call().then((result) => {
                
//                 DbUserAddress.twcbal = web3.utils.fromWei(result, 'ether')  
//         //     User.findOneAndUpdate({ twcbal: (web3.utils.fromWei(tempAddress, 'ether')) }).then(result => {
//                 console.log("IF CONDITION result>>>>>", result)
//             }).catch(error => {
//                 console.log("IF CONDITION error>>>>>", error)

//             });

//         }else{
//             let InNewUserAddress = User();
//             console.log('NEW INSERTED ADDRESS',InNewUserAddress);
//         //     sContract.methods.balanceOf(tempAddress).call().then((result) => 
//         //     { 
//         //         console.log('ELSE CONDITION result >>>>>',result);
                   
//         //             // userAddressSchema.address = temp;

//         //         InNewUserAddress.twcbal = (web3.utils.fromWei(result, 'ether'));
//         //         InNewUserAddress.save()

//         //         });
//         sContract.methods.balanceOf(tempAddress).call().then((result) => {
//             userSchema.twcbal = web3.utils.fromWei(result, 'ether')  
//             userSchema.save() })

//         // };
//     }
//     catch(error){
//         console.log('Error',error);
//     }
// })








