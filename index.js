//alert("javascript is connected")
// display "please install metamask elsewhere"
import {ethers} from "./ethers-5.6.esm.min.js"
import {contractAddress,ABI} from "./constants.js"
const sendTransaction = document.getElementById("send-transaction")
const connectButton = document.getElementById("connect-button")
const connectWalletButton = document.getElementById("connect-wallet-button")
//const balanceButton = document.getElementById("see")
//balanceButton.onclick = balance
connectWalletButton.onclick = connectWallet
connectButton.onclick = connect
sendTransaction.onclick = transfer

async function connect() {
    if(window.ethereum !== "undefined"){
         try {await window.ethereum.request({method: "eth_requestAccounts"})
    }catch(error) {
        console.log(error)
    }
    connectButton.innerHTML = "CONNECTED"
    connectWalletButton.innerHTML = "WALLET CONNECTED"
    }
    else {
    connectButton.innerHTML = "PLEASE INSTALL METAMASK"
    connectWalletButton.innerHTML = "PLEASE INSTALL METAMASK"
    }
}
async function connectWallet() {
    if(window.ethereum !== "undefined"){
        try {await window.ethereum.request({method: "eth_requestAccounts"})
    }catch(error){
        console.log(error)
    }
    connectWalletButton.innerHTML = "WALLET CONNECTED"
    connectButton.innerHTML = "CONNECTED"
}
else {
    connectWalletButton.innerHTML = "PLEASE INSTALL METAMASK"
    connectButton.innerHTML = "PLEASE INSTALL METAMASK"
}
}
async function transfer() {
    if(window.ethereum !== "undefined"){
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signers = provider.getSigner()
    const Contract = new ethers.Contract(contractAddress, ABI, signers)
    const recipientAddress = document.getElementById("recipient").value
    const amount = document.getElementById("amount").value
    const description = document.getElementById("description").value
  
    try{
    await Contract.sendEth(recipientAddress,description,{value: ethers.utils.parseEther(amount)})
    } catch(error){
        console.log(error)
    }
    
}
}
/*
async function balance() {
    alert("clicked")
    if(window.ethereum !== "undefined"){
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const Signer = provider.getSigner()
    const Contract = new ethers.Contract(contractAddress,ABI,Signer)
    try {
        const balance = await Contract.balanceOfUser()
        console.log(balance)
    } catch(error){
        console.log(error)
    }
    }
}
*/