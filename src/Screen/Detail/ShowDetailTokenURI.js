import { useState } from 'react';
import SafeArea from '../../Components/SafeArea'
import { toast } from 'react-hot-toast';
import { isEmpty } from '../../Utils';
import { nftContract } from '../../Common';

export default function ShowDetailTokenURI() {
    const [ownerOf, setOwnerOf] = useState('');
    const [objectNft, setObjectNft] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [handleClick, setHandleClick] = useState(false);
    const [tokenURI, setTokenURI] = useState('');

    const handleSearchToken = async () => {
        try {
            setHandleClick(true)
            const { ethereum } = window;
            if (ethereum) {
                setIsSuccess(false);
                let ownerOf = await nftContract.ownerOf(tokenURI);
                let object = await nftContract.data(tokenURI);
                if (!isEmpty(ownerOf) && !isEmpty(object)) {
                    setOwnerOf(ownerOf);
                    setObjectNft(object);
                    setIsSuccess(true);
                    setHandleClick(false)
                }
            } else {
                toast.error("Ethereum object does not exist", {
                    position: 'top-right',
                });
            }
        } catch (err) {
            setIsSuccess(false);
            setHandleClick(false)
            if (err.reason !== undefined) {
                toast.error(err.reason, {
                    position: 'top-right',
                });
            }
        }
    };

    return (
        <SafeArea>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">

                <div className='mb-4'>
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search NFT token</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-100 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input type="number" value={tokenURI} onChange={e => setTokenURI(e.target.value)} id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-200 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search NFT token, please enter token number" required />
                        <button onClick={handleSearchToken} type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search NFT token</button>
                    </div>
                </div>

                {isSuccess ? (
                    <div>
                        <div className="flex w-full transform text-left text-base transition md:my-4">
                            <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 rounded-xl">
                                <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
                                    <div className="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                                        <img src={objectNft[1].replace('ipfs://', 'https://ipfs.io/ipfs/')} alt={objectNft[0]} className="object-cover object-center" />
                                    </div>
                                    <div className="sm:col-span-8 lg:col-span-7">
                                        <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{objectNft[0]}</h2>
                                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl relative mt-2 mb-3" role="alert">
                                            <strong className="font-bold">Owner by: </strong>
                                            <span className="block sm:inline">{ownerOf}</span>
                                        </div>
                                        <section aria-labelledby="information-heading" className="mt-2 bg-gray-100 p-3 rounded-xl">
                                            <h3 id="information-heading" className="sr-only">Product information</h3>
                                            <p className='text-black font-bold'>Detail</p>
                                            <p className="text-xl text-gray-900">{objectNft[2]}</p>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {(tokenURI && handleClick) && (
                            <div className="grid gap-2 mt-32">
                                <div className="flex items-center justify-center ">
                                    <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                                </div>
                            </div>
                        )}
                    </>

                )}
            </div>
        </SafeArea>
    )
}
