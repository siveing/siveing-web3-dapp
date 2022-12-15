// const checkWalletIsConnected = async () => {
//     const { ethereum } = window;

//     if (!ethereum) {
//         console.log("Make sure you have Metamask installed!");
//         return;
//     } else {
//         toast.success("Wallet exists! We're ready to go!", {
//             position: 'top-right',
//         });
//     }

//     const accounts = await ethereum.request({ method: 'eth_accounts' });

//     if (accounts.length !== 0) {
//         const account = accounts[0];
//         console.log("Found an authorized account: ", account);
//         setCurrentAccount(account);
//     } else {
//         console.log("No authorized account found");
//     }
// }
