import { useEffect, useState } from 'react';
import SafeArea from '../../Components/SafeArea'
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ethers } from 'ethers';

import contractNFT from './../../Contracts/CSRTNft.json';
import { isEmpty } from '../../Utils';
const contractNFTAddress = contractNFT.addressContract;
const abiNFT = contractNFT.abi;

export default function ShowDetailTokenURI() {
    let params = useParams();
    const [ownerOf, setOwnerOf] = useState('');
    const [objectNft, setObjectNft] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const getObject = async () => {
            try {
                const tokenURI = params.id;
                const { ethereum } = window;
                if (ethereum) {
                    setIsSuccess(false);
                    const provider = new ethers.providers.Web3Provider(ethereum);
                    const signer = provider.getSigner();
                    const nftContract = new ethers.Contract(contractNFTAddress, abiNFT, signer);
                    let ownerOf = await nftContract.ownerOf(tokenURI);
                    let object = await nftContract.data(tokenURI);
                    if (!isEmpty(ownerOf)) setOwnerOf(ownerOf);
                    if (!isEmpty(object)) setObjectNft(object);
                    setIsSuccess(true);
                } else {
                    toast.error("Ethereum object does not exist", {
                        position: 'top-right',
                    });
                }
            } catch (err) {
                setIsSuccess(false);
                if (err.data !== undefined && err.data.message !== undefined) {
                    toast.error(err.data.message, {
                        position: 'top-right',
                    });
                    return
                }
                if (err.message !== undefined) {
                    toast.error(err.message, {
                        position: 'top-right',
                    });
                }
            }
        }

        return () => {
            getObject()
        };
    }, []);

    return (
        <SafeArea>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                {isSuccess ? (
                    <div>
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl relative" role="alert">
                            <strong className="font-bold">Account connected: </strong>
                            <span className="block sm:inline">{ownerOf}</span>
                        </div>

                        <div className="flex w-full transform text-left text-base transition md:my-4">
                            <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 rounded-xl">
                                <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
                                    <div className="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                                        <img src={objectNft[1].replace('ipfs://', 'https://ipfs.io/ipfs/')} alt={objectNft[0]} className="object-cover object-center" />
                                    </div>
                                    <div className="sm:col-span-8 lg:col-span-7">
                                        <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{objectNft[0]}</h2>
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
                    <div className="grid gap-2 mt-32">
                        <div className="flex items-center justify-center ">
                            <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                        </div>
                    </div>
                )}
            </div>
        </SafeArea>
    )
}
