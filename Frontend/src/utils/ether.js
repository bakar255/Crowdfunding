import { ethers } from 'ethers';

const provider = new ethers.providers.InfuraProvider('sepolia', 'https://sepolia.infura.io/v3/8eb79aff59ef473c8d08a2b6d6de8096');

export const getProvider = () => {
  return provider;
};
