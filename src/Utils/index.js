const connectWalletHandler = async (setCurrentAccount) => {
    const { ethereum } = window;

    if (!ethereum) {
        alert("Please install Metamask!");
    }

    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        console.log("Found an account! Address: ", accounts[0]);
        setCurrentAccount(accounts[0]);
    } catch (err) {
        console.log(err)
    }
}

export default connectWalletHandler;

export function isEmpty(value) {
    return value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0);
}

export function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export function eToNumber(num) {
    return (''+ +num).replace(/(-?)(\d*)\.?(\d*)e([+-]\d+)/,
      function(a,b,c,d,e) {
        return e < 0
          ? b + '0.' + Array(1-e-c.length).join(0) + c + d
          : b + c + d + Array(e-d.length+1).join(0);
      });
}
