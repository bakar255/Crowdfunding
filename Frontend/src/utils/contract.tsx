import { BrowserProvider, ethers} from 'ethers';
import contractABI from '@/utils/ContractABI.json';
import  contractAddress from '@/utils/addresse';

export const getContract = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask non installé");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const accounts = await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  
  return new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
};