import React from 'react'

export default function ConnectWallet({ connectWalletHandler }) {
    return (
        <div className='text-center'>
            <h3 className='text-2xl font-bold mb-1'>Welcome to Siveing Dapp</h3>
            <p className="mb-2 text-lg leading-8 text-gray-600 sm:text-center">
                Please connect the wallet to do many action in my dapp.
            </p>
            <button onClick={connectWalletHandler} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                👉  Connect Wallet
            </button>
        </div>
    )
}
