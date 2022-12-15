import React, { createContext, useReducer, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { eToNumber, isEmpty } from '../Utils';
import { setCurrentUser } from './actions';
import reducers from './reducers';
import { ethers } from 'ethers';
import contract from './../Contracts/SSartToken.json';
export const StateContext = createContext();
const { Provider } = StateContext;

const contractAddress = contract.addressContract;
const abi = contract.abi;

function StateProvider(props) {

    const initialState = {
        isAuthenticated: false,
        wallet: {}
    };

    const [stateUser, dispatch] = useReducer(reducers, initialState);
    const [CheckingIsAuthenticated, setCheckingIsAuthenticated] = useState(false);
    const { ethereum } = window;

    useEffect(() => {

        if (!ethereum) {
            console.log("Make sure you have Metamask installed!");
            return;
        }

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const tokenContract = new ethers.Contract(contractAddress, abi, signer);

        window.ethereum.on('accountsChanged', async () => {
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            if (isEmpty(accounts)) {
                dispatch(setCurrentUser(null));
            } else {
                let balance = await tokenContract.balanceOf(accounts[0]);
                let name = await tokenContract.name();
                let symbol = await tokenContract.symbol();
                dispatch(setCurrentUser({ address: accounts[0], balance: eToNumber(Number(balance._hex) / 10 ** 18), name: name, symbol: symbol }));
                toast.success(`Connected to ${accounts[0]}`, {
                    position: 'top-right',
                });
            }
            setCheckingIsAuthenticated(true);
            return;
        });

        const retrieveData = async () => {
            try {
                const accounts = await ethereum.request({ method: 'eth_accounts' });
                if (accounts.length !== 0) {
                    const account = accounts[0];
                    if (!isEmpty(account)) {
                        let balance = await tokenContract.balanceOf(account);

                        let name = await tokenContract.name();
                        let symbol = await tokenContract.symbol();
                        dispatch(setCurrentUser({ address: account, balance: eToNumber(Number(balance._hex) / 10 ** 18), name: name, symbol: symbol }));
                    }
                } else {
                    console.log("No authorized account found");
                }
                setCheckingIsAuthenticated(true);
            } catch (error) {
                setCheckingIsAuthenticated(false);
            }
        };

        retrieveData();

    }, [CheckingIsAuthenticated]);

    if (!CheckingIsAuthenticated) {
        return null;
    } else {
        return (
            <Provider value={{ stateUser, dispatch }}>
                {props.children}
            </Provider>
        );
    }
}

export default StateProvider;