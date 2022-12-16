import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { eToNumber } from "../../Utils";
import { blockExplorer, tokenContract } from "../../Common";

export default function TransferTokenModal({ setShowModal, showModal }) {
    const { ethereum } = window;
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [transaction, setTransaction] = useState(null);
    const [isSuccess, setIsSuccess] = useState(true);

    const handleMintToken = async () => {
        if (address === '') {
            toast.error("Please check your wallet again!", {
                position: 'top-right',
            });
            return;
        } else if (amount === '') {
            toast.error("Please check your amount again!", {
                position: 'top-right',
            });
            return;
        }

        try {
            if (ethereum) {
                setIsSuccess(false);
                let nftTxn = await tokenContract.transfer(address, eToNumber((amount * 10 ** 18).toString()));
                // Waiting the transaction is success
                await nftTxn.wait();
                toast.success("Transfer successfully.", {
                    position: 'top-right',
                });
                setTransaction(nftTxn.hash);
                setIsSuccess(true);
            } else {
                toast.error("Ethereum object does not exist", {
                    position: 'top-right',
                });
            }
        } catch (err) {
            setIsSuccess(true);
            if (err.reason !== undefined) {
                toast.error(err.reason, {
                    position: 'top-right',
                });
            }
        }
    }

    return (
        <>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-full my-6 mx-auto max-w-2xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-xl font-semibold">
                                        Transfer Token
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6">
                                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                Adress
                                            </label>
                                            <input
                                                value={address}
                                                type="text"
                                                onChange={(e) => setAddress(e.target.value)}
                                                name="address"
                                                autoComplete="given-name"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-6 gap-6 mt-2">
                                        <div className="col-span-6">
                                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                Amount
                                            </label>
                                            <input
                                                value={amount}
                                                type="number"
                                                min={0}
                                                onChange={(e) => setAmount(e.target.value)}
                                                name="amount"
                                                autoComplete="given-name"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>

                                    {transaction ? (
                                        <p className="text-green-500 text-lg leading-relaxed mt-2">
                                            Minted, see transaction: <br />
                                            <a href={blockExplorer + transaction} target={'_blank'} className="text-black">
                                                {transaction.slice(0, 60) + '...'}
                                            </a>
                                        </p>
                                    ) : (
                                        <p className="text-red-500 text-lg leading-relaxed mt-2">
                                            * Please fill the form such as address and amount to transfer.
                                        </p>
                                    )}
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    {!transaction &&
                                        <button
                                            disabled={!isSuccess}
                                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => handleMintToken()}
                                        >
                                            Transfer Now
                                        </button>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}