//alert("transactioHistory.js is connected")

let screenWidth = window.innerWidth
if(screenWidth <= 820){
  alert("YOU NEED A A DESKTOP OR LAPTOP TO ACCESS THIS SITE")
  body.style.display = "none";
  }

import {ethers} from "./ethers-5.6.esm.min.js"
import {contractAddress,ABI} from "./constants.js"
const displayBalance = document.getElementById("see")
const  balanceScreen = document.getElementById("amounth2")
const amountIn = document.getElementById("in")
const amountOut = document.getElementById("out")
const showConnected = document.getElementById("connect-button")

displayBalance.onclick = display

 async function display() {
  //  alert("display clicked")

    if(window.ethereum !== "undefined") {

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const Contract = new ethers.Contract(contractAddress,ABI,signer)
        const userBalance = await Contract.balanceOfUser()
        console.log(ethers.utils.formatEther(userBalance))
        balanceScreen.innerHTML = "BALANCE: " + ((userBalance)/1e18).toFixed(2) +  " ether"
        const totalAmountOut = await Contract.totalAmountOut()
        const totalAmountIn = await Contract.totalAmountIn()
        const totalIn = parseFloat(ethers.utils.formatEther(totalAmountIn))
        const totalOut = parseFloat(ethers.utils.formatEther(totalAmountOut))
        amountIn.innerHTML = "IN: " + totalIn.toFixed(2) + "ether"
        amountOut.innerHTML = "OUT: " + totalOut.toFixed(2) + "ether"
        showConnected.innerHTML = "CONNECTED"
     }
}

displayBalance.addEventListener("dblclick", function() {
 location.reload();
})
