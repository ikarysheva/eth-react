import Web3 from 'web3';
import contract from 'truffle-contract';

const provider = new Web3.providers.HttpProvider('http://localhost:8545');


let web3;
// Instantiate new web3 global instance
if (typeof window !== 'undefined' && // Check we're on the client-side
    (typeof window.web3 === 'undefined' ||
        typeof window.web3.currentProvider === 'undefined')) {
    window.web3 = new Web3(provider);
}

// Instantiate new web3 local instance
if (typeof window !== 'undefined' && // Check we're on the client-side
    typeof window.web3 !== 'undefined' &&
    typeof window.web3.currentProvider !== 'undefined') {
    web3 = new Web3(window.web3.currentProvider);
}


export const selectContractInstance = (contractBuild) => {
    return new Promise(res => {
        const myContract = contract(contractBuild);
        myContract.setProvider(getCurrentProvider());
        const newContract = fixTruffleContractCompatibilityIssue(myContract);
        newContract
            .deployed()
            .then(instance => { res(instance) });
    })
}

function fixTruffleContractCompatibilityIssue(contract) {
    if (typeof contract.currentProvider.sendAsync !== "function") {
        contract.currentProvider.sendAsync = function () {
            return contract.currentProvider.send.apply(
                contract.currentProvider, arguments
            );
        };
    }
    return contract;
}

export function getCurrentProvider() {
    return web3.currentProvider;
}

export default web3;