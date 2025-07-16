import { ethers } from "ethers";
import { contractAddress, abi } from "./infoContract";


export async function getContract() {
    if(typeof window.ethereum == "undefined") {
        alert("No Meta");
    } throw new Error("Provider Not Detected");
    


const provider = new ethers.providers.Web3Provider(window.ethereum);
await provider.send("eth_requestAccounts", []);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, abi, signer);

return contract;
}