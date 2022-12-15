import { useContext, useState } from 'react';
import SafeArea from '../../Components/SafeArea'
import MintTokenModal from './../ModalScreen/MintTokenModal';
import MintNFTModal from './../ModalScreen/MintNFTModal';
import { StateContext } from '../../Context/StateProvider';
import TransferTokenModal from '../ModalScreen/TransferTokenModal';

export default function Account() {

    const [showModalMintToken, setShowModalMintToken] = useState(false);
    const [showModaklTransferToken, setShowModaklTransferToken] = useState(false);
    const [showModalMintNFT, setShowModalMintNFT] = useState(false);
    const { stateUser } = useContext(StateContext);

    return (
        <SafeArea>
            {/* Modal work */}
            {showModalMintToken && <MintTokenModal showModal={showModalMintToken} setShowModal={setShowModalMintToken} />}
            {showModalMintNFT && <MintNFTModal showModal={showModalMintNFT} setShowModal={setShowModalMintNFT} />}
            {showModaklTransferToken && <TransferTokenModal showModal={showModaklTransferToken} setShowModal={setShowModaklTransferToken} />}

            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                <div>
                    <div className="bg-orange-100 border border-orange-400 text-orange-700 px-4 py-3 rounded-xl relative" role="alert">
                        <div>
                            <strong className="font-bold">Account connected: </strong>
                            <span className="block sm:inline">{stateUser.wallet.address}</span>
                        </div>
                        <div className='mt-2'>
                            <strong className="font-bold">Balance: </strong>
                            <span className="block sm:inline">{stateUser.wallet.balance} <b>{stateUser.wallet.symbol}</b></span>
                        </div>
                    </div>

                    <button onClick={() => setShowModalMintToken(true)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3'>
                        Mint SSART Token
                    </button>

                    <button onClick={() => setShowModalMintNFT(true)} className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-3 ml-3'>
                        Mint CSRT NFT
                    </button>

                    <button onClick={() => setShowModaklTransferToken(true)} className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-3 ml-3'>
                        Transfer Token
                    </button>
                </div>
            </div>
        </SafeArea >
    )
}
