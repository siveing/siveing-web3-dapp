import React, { createContext, useReducer, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { eToNumber, isEmpty } from '../Utils';
import { setCurrentUser } from './actions';
import reducers from './reducers';
import { provider, someTestnetChainIds, tokenContract } from '../Common';

export const StateContext = createContext();
const { Provider } = StateContext;

function StateProvider(props) {

    const initialState = {
        isAuthenticated: false,
        wallet: {}
    };

    const [stateUser, dispatch] = useReducer(reducers, initialState);
    const [CheckingIsAuthenticated, setCheckingIsAuthenticated] = useState(false);

    useEffect(() => {

        const { ethereum } = window;

        if (!ethereum) {
            console.log("Make sure you have Metamask installed!");
            return;
        }

        window.ethereum.on('accountsChanged', async () => {
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            if (isEmpty(accounts)) {
                dispatch(setCurrentUser(null));
            } else {
                let balance = await tokenContract.balanceOf(accounts[0]);
                let name = await tokenContract.name();
                let owner = await tokenContract.owner();
                let symbol = await tokenContract.symbol();
                dispatch(setCurrentUser({ address: accounts[0], balance: eToNumber(Number(balance._hex) / 10 ** 18), name: name, symbol: symbol, owner: owner }));
                toast.success(`Connected to ${accounts[0]}`, {
                    position: 'top-right',
                });
            }
            setCheckingIsAuthenticated(true);
            return;
        });

        const retrieveData = async () => {

            const { chainId } = await provider.getNetwork()
            if (!someTestnetChainIds.includes(chainId)) {
                alert("Please make sure you're conntect to testnet network (IOTEX, POLYGON).");
                return;
            }

            try {
                const accounts = await ethereum.request({ method: 'eth_accounts' });
                if (accounts.length !== 0) {
                    const account = accounts[0];
                    if (!isEmpty(account)) {
                        let balance = await tokenContract.balanceOf(account);
                        let name = await tokenContract.name();
                        let symbol = await tokenContract.symbol();
                        let owner = await tokenContract.owner();
                        dispatch(setCurrentUser({ address: account, balance: eToNumber(Number(balance._hex) / 10 ** 18), name: name, symbol: symbol, owner: owner }));
                    }
                } else {
                    console.log("No authorized account found");
                }
                setCheckingIsAuthenticated(true);
            } catch (error) {
                console.log("error");
                console.log(error);
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