import React from 'react'
import abi from './contracts/Superchat.json'
import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import Buy from './components/Buy'
import Memos from './components/Memos'
import { toast } from 'react-toastify'

const App = () => {
  const [state, setState] = useState(
    {
      provider: null,
      signer: null,
      contract: null
    }
  )
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
      // console.log(contractAddress)
      const contractAbi = abi.abi;

      try {
        const { ethereum } = window;

        if (ethereum) {
          const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
          // console.log('Accounts:', accounts);

          const provider = new ethers.providers.Web3Provider(ethereum);
          //   console.log('Provider:', provider);

          const signer = provider.getSigner();
          //  console.log('Signer:', signer);

          const contract = new ethers.Contract(contractAddress, contractAbi, signer);
          // console.log('Contract:', contract);

          setState({ provider, signer, contract });
        } else {
          toast.info('No Ethereum provider found. Install MetaMask or another wallet.', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
          });
        }
      } catch (error) {
        toast.error(`Error connecting to wallet:${error}`, {
          position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        });
      }
    };

    connectWallet();
  }, []);
  // console.log(state)
  return (
    <div>
      <Buy state={state} />
      <Memos state={state} />
    </div>
  )
}

export default App