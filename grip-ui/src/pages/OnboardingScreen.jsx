import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { connect, keyStores, WalletConnection } from 'near-api-js';

const OnboardingScreen = () => {
  const connectToWallet = async () => {
    const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();

    const connectionConfig = {
      networkId: "testnet",
      keyStore: myKeyStore,
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://testnet.mynearwallet.com/",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://testnet.nearblocks.io",
    };

    try {
      const nearConnection = await connect(connectionConfig);
      const walletConnection = new WalletConnection(nearConnection);

      if (!walletConnection.isSignedIn()) {
        await walletConnection.requestSignIn({
          contractId: "example-contract.testnet.REPLACE_ME",
          methodNames: [],
          successUrl: "REPLACE_ME://.com/success",
          failureUrl: "REPLACE_ME://.com/failure",
        });
      } else {
        console.log("user is already signed in");
      }

      return walletConnection;
    } catch (error) {
      console.error("Failed to connect to wallet:", error);
    }
  };

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true)
  }
  const handleClickClose = () => {
    setOpen(false)
  }

  return (
    <div className='w-[380px] h-[600px] bg-[#0a0a0a] font-bai flex flex-col justify-start items-start p-[2px]'>
      <div className="flex flex-row justify-start items-center p-3 border border-[#3a3a3a] w-full">
        <h1 className="text-[#fafafa] text-xl font-medium">Grip</h1>
      </div>
      <div className='flex flex-col mt-14 text-[#fafafa] px-5'>
        <h1 className='text-lg font-medium'>TRANSFER</h1>
        <h2 className='text-5xl ml-4 font-bold'>CRYPTO</h2>
        <h2 className='text-5xl ml-4 font-bold'>ASSETS</h2>
        <h3 className='text-lg font-medium'>SEAMLESSLY</h3>
      </div>
      <div className="text-[#fafafa] w-full flex flex-col justify-start mt-14">
        <div className="flex flex-col w-[90%] mx-auto justify-between items-start px-5 py-2 border border-[#3a3a3a]">
          <div className="flex flex-row justify-between items-center w-full">
            <h1 className="text-sm font-medium">what is grip?</h1>
            <span className="">
              {open ? (<FaChevronDown className="cursor-pointer" onClick={handleClickClose} />) : (<FaChevronUp onClick={handleClick} className="cursor-pointer" />)}
            </span>
          </div>
          <span className="">
            {open ? (
              <div className="flex mt-5">
                <p className="text-sm">
                  Grip is a user-friendly browser extension wallet that empowers Near token holders to effortlessly transfer their assets between Near and other block chain networks.
                </p>
              </div>
            ) : ""}
          </span>
        </div>
        <div className="flex justify-center items-center">
          <button className="absolute bottom-3 w-[85%] mx-auto px-3 py-[8px] text-base font-semibold bg-[#fafafa] text-[#0a0a0a]" onClick={connectToWallet}>
            connect wallet
          </button>
        </div>
      </div>
    </div>
  )
}

export default OnboardingScreen