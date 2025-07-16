import { ethers } from 'ethers';
import contractABI from '@/utils/ContractABI.json';
import { contractAddress } from '@/utils/addresse';

export const getContract = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask non installé");
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  
  return new ethers.Contract(
    CONTRACT_ADDRESS,
    YourContractABI,
    signer
  );
};