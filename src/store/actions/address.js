import * as actionTypes from './actionTypes';
import web3 from '../../web3';
import { checkAddressValidity } from '../../shared/utility'

export const checkAddressStart = () => {
    return {
        type: actionTypes.CHECK_ADDRESS_START
    };
};


export const checkAddressSuccess = () => {
    return {
        type: actionTypes.CHECK_ADDRESS_SUCCESS
    };
};

export const checkAddressFail = (error) => {
    return {
        type: actionTypes.CHECK_ADDRESS_FAIL,
        error: error
    };
};

export const checkAddressComplete = () => {
    return {
        type: actionTypes.CHECK_ADDRESS_COMPLETE
    };
};

export const checkAddress = (address) => {
    return dispatch => {
        //dispatch(checkAddressStart());
        console.log(web3.utils.isAddress(address));
        if (checkAddressValidity(address)) {
            dispatch(checkAddressSuccess());
        } else {
            dispatch(checkAddressFail('Ethereum address is wrong'));
        }

    }
}