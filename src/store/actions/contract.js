import * as actionTypes from './actionTypes';
import { selectContractInstance } from '../../web3';

export const setWeb3Contract = (contract) => {
    return {
        type: actionTypes.SET_WEB3_CONTRACT,
        contractInstance: contract
    };
};

export const getWeb3Contract = (contractBuild) => {
    return dispatch => {
        selectContractInstance(contractBuild).then(instance => {
            dispatch(setWeb3Contract(instance));
        });

    }
}