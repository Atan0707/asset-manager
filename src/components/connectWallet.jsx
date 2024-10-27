import { useState, useEffect } from 'react';
import { ethers } from "ethers";

const ConnectWallet = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const handleConnect = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
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
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        } else {
          setWalletAddress(null);
        }
      });

      return () => {
        window.ethereum.removeListener('accountsChanged', () => {});
      };
    }
  }, []);

  return (
    <div className='flex items-center'>
      {walletAddress ? (
        <>
          
          <button onClick={changeWallet}><p>Connected: {walletAddress.slice(0, 5)}...{walletAddress.slice(-5)}</p></button>
        </>
      ) : (
        <button onClick={handleConnect}>Connect Wallet</button>
      )}
    </div>
  );
};

export default ConnectWallet;
