//alert("javascript is connected")
// display "please install metamask elsewhere"

let screenWidth = window.innerWidth;
console.log(screenWidth);

if (screenWidth <= 820) {
  alert("YOU NEED A A DESKTOP OR LAPTOP TO ACCESS THIS SITE");
  body.style.display = "none";
}

import { ethers } from "./ethers-5.6.esm.min.js";
import { contractAddress, ABI } from "./constants.js";
const sendTransaction = document.getElementById("send-transaction");
const connectButton = document.getElementById("connect-button");
const connectWalletButton = document.getElementById("connect-wallet-button");
const balanceButton = document.getElementById("accountBalance");
//const displayBalance = document.getElementById("see")
//displayBalance.onclick = showBalance
sendTransaction.onclick = transfer;
connectButton.onclick = connect;
connectWalletButton.onclick = connectWallet;

async function connect() {
  if (window.ethereum !== "undefined") {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.log(error);
    }
    connectButton.innerHTML = "CONNECTED";
    connectWalletButton.innerHTML = "WALLET CONNECTED";
  } else {
    connectButton.innerHTML = "PLEASE INSTALL METAMASK";
    connectWalletButton.innerHTML = "PLEASE INSTALL METAMASK";
  }
}
async function connectWallet() {
  if (window.ethereum !== "undefined") {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.log(error);
    }
    connectWalletButton.innerHTML = "WALLET CONNECTED";
    connectButton.innerHTML = "CONNECTED";
  } else {
    connectWalletButton.innerHTML = "PLEASE INSTALL METAMASK";
    connectButton.innerHTML = "PLEASE INSTALL METAMASK";
  }
}
async function transfer() {
  if (window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signers = provider.getSigner();
    const Contract = new ethers.Contract(contractAddress, ABI, signers);
    const recipientAddress = document.getElementById("recipient").value;
    const amount = document.getElementById("amount").value;
    const description = document.getElementById("description").value;

    try {
      await Contract.sendEth(recipientAddress, description, {
        value: ethers.utils.parseEther(amount),
      });
    } catch (error) {
      console.log(error);
    }
  } 
  else {
    alert(
      "KINDLY LOOK FOR THE CONNECT BUTTON AND CONNECT THIS WEBSITE WITH YOUR METAMASK!"
    );
  }
}
