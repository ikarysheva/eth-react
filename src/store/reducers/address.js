import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    isValid: false,
    error: null
}

const checkAddressStart = (state, action) => {
    return updateObject(state, {
        error: null,
        isValid: false
    });
};

const checkAddressSuccess = (state, action) => {
    return updateObject(state, {
        isValid: true,
        error: null
    });
};

const checkAddressFail = (state, action) => {
    return updateObject(state, {
        isValid: false,
        error: action.error
    });
};

const checkAddressComplete = (state, action) => {
    return updateObject(state, {
        error: null,
        isValid: false
    });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.CHECK_ADDRESS_START: return checkAddressStart(state, action);
        case actionTypes.CHECK_ADDRESS_SUCCESS: return checkAddressSuccess(state, action);
        case actionTypes.CHECK_ADDRESS_FAIL: return checkAddressFail(state, action);
        case actionTypes.CHECK_ADDRESS_COMPLETE: return checkAddressComplete(state, action);
        default: return state
    }
}

export default reducer;

