import { ethers } from 'ethers';
import AssetManagerABI from '../../contract/AssetManager.json';

export const useContractSubmit = (contractAddress) => {
  const handleSubmit = async (method, ...args) => {
    if (!window.ethereum) {
      alert('Please install MetaMask to use this feature.');
      return false;
    }

    try {
      console.log(`Calling contract method: ${method} with args:`, args);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, AssetManagerABI.abi, signer);

      if (method === 'customers') {
        // This is a read operation
        const result = await contract[method](args[0]);
        console.log('Read operation result:', result);
        return result;
      }else if (method === 'getCustomerProperties'){
         {
            const result = await contract[method](args[0]);
            console.log('Read operation result:', result);
            return result;
          }
      } else if (method === 'addCustomerData') {
        // This is a write operation
        const tx = await contract[method](...args);
        await tx.wait();
        console.log('Write operation successful');
        return true;
      } else if (method === 'getCustomerInheritors') {
        // This is a read operation
        const result = await contract[method](args[0]);
        console.log('Read operation result:', result);
        return result;
      }
      else {
        // This is a write operation
        const tx = await contract[method](...args);
        await tx.wait();
        console.log('Write operation successful');
        return true;
      }


    } catch (error) {
      console.error(`Error in contract submission:`, error);
      return false;
    }
  };

  return handleSubmit;
};
