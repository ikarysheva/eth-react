import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    contractInstance: null
}

const setWeb3Contract = (state, action) => {
    return updateObject(state, action.contract);
};

export default (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.SET_WEB3_CONTRACT:
            return setWeb3Contract(state, action)

        default:
            return state
    }
}
