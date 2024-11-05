import { useState, useEffect } from 'react';
import { ethers } from "ethers";

const ConnectWallet = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);

  const EXPECTED_NETWORK_ID = '31337'; // Hardhat's default network ID

  const checkNetwork = async (provider) => {
    const network = await provider.getNetwork();
    const isCorrect = network.chainId.toString() === EXPECTED_NETWORK_ID;
    setIsCorrectNetwork(isCorrect);
    return isCorrect;
  };

  // force to connect to network
  const handleConnect = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        
        const isCorrect = await checkNetwork(provider);
        if (!isCorrect) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: "0x7A69", // 31337 in hexadecimal
              rpcUrls: ["http://127.0.0.1:8545/"],
              chainName: "Hardhat Localhost",
              nativeCurrency: {
                name: "ETH",
                symbol: "ETH",
                decimals: 18
              },
              blockExplorerUrls: null
            }]
          });
          
          const isCorrectAfterSwitch = await checkNetwork(provider);
          if (!isCorrectAfterSwitch) {
            alert("Please connect to the Hardhat localhost network.");
            return;
          }
        }

        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this feature.");
    }
  };

  const changeWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }] });
        await handleConnect();
      } catch (error) {
        console.error("Error changing wallet:", error);
      }
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      checkNetwork(provider);

      window.ethereum.on('chainChanged', () => {
        checkNetwork(provider);
      });

      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        } else {
          setWalletAddress(null);
        }
      });

      return () => {
        window.ethereum.removeListener('chainChanged', () => {});
        window.ethereum.removeListener('accountsChanged', () => {});
      };
    }
  }, []);

  return (
    <div className='flex items-center'>
      {walletAddress ? (
        <>
          {isCorrectNetwork ? (
            <button onClick={changeWallet}><p>Connected: {walletAddress.slice(0, 5)}...{walletAddress.slice(-5)}</p></button>
          ) : (
            <button onClick={handleConnect}>Switch to Hardhat Network</button>
          )}
        </>
      ) : (
        <button onClick={handleConnect}>Connect Wallet</button>
      )}
    </div>
  );
};

export default ConnectWallet;
