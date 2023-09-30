//alert("transactioHistory.js is connected")
import {ethers} from "./ethers-5.6.esm.min.js"
import {contractAddress,ABI} from "./constants.js"
const displayBalance = document.getElementById("see")
const  balanceScreen = document.getElementById("accountBalance")
const amountIn = document.getElementById("in")
const amountOut = document.getElementById("out")
displayBalance.onclick = display

 async function display() {
  //  alert("display clicked")

    if(window.ethereum !== "undefined") {

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const Contract = new ethers.Contract(contractAddress,ABI,signer)
        const userBalance = await Contract.balanceOfUser()
        console.log(ethers.utils.formatEther(userBalance))
        balanceScreen.innerHTML = "BALANCE: " + userBalance +  " ether"
        const totalAmountOut = await Contract.totalAmountOut()
        const totalAmountIn = await Contract.totalAmountIn()
        const totalIn = parseFloat(ethers.utils.formatEther(totalAmountOut))
        const totalOut = parseFloat(ethers.utils.formatEther(totalAmountIn))
        amountIn.innerHTML = "IN: " + totalIn.toFixed(2) + "ether"
        amountOut.innerHTML = "OUT" + totalOut.toFixed(2) + "ether"
     }
}