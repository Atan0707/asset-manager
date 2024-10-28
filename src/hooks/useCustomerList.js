import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import AssetManagerABI from '../../contract/AssetManager.json';

export const useCustomerList = (contractAddress) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      if (!window.ethereum) {
        setError('Please install MetaMask to use this feature.');
        setLoading(false);
        return;
      }

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, AssetManagerABI.abi, provider);

        console.log('Fetching customer count...');
        const customerCount = await contract.customerIdCounter();
        console.log('Customer count:', customerCount);

        const fetchedCustomers = [];

        for (let i = 0; i < customerCount; i++) {
          console.log(`Fetching customer ${i}...`);
          try {
            const customer = await contract.customers(i);
            fetchedCustomers.push({
              id: i,
              name: customer.name,
              ic: customer.ic,
              contactNo: customer.contactNo,
              address: customer.Address
            });
          } catch (customerError) {
            console.error(`Error fetching customer ${i}:`, customerError);
          }
        }

        setCustomers(fetchedCustomers);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching customers:', err);
        setError(`Failed to fetch customers: ${err.message}`);
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [contractAddress]);

  return { customers, loading, error };
};
