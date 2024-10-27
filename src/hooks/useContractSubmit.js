import { ethers } from 'ethers';
import AssetManagerABI from '../../contract/AssetManager.json';

export const useContractSubmit = (contractAddress) => {
  const handleSubmit = async (method, ...args) => {
    if (!window.ethereum) {
      alert('Please install MetaMask to use this feature.');
      return false;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, AssetManagerABI.abi, signer);

      const tx = await contract[method](...args);
      await tx.wait();

      return true;
    } catch (error) {
      console.error(`Error in contract submission:`, error);
      return false;
    }
  };

  return handleSubmit;
};
