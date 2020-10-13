import { ADD_PRODUCT_BASKET } from './types.js';
import { REMOVE_PRODUCT_BASKET }  from '../actions/types';

export const addBasket = (product) => {
    return (dispatch) => {
        
        dispatch({
            type: ADD_PRODUCT_BASKET,
            payload: product
        })
    }
}


export const removeBasket = (productId) => {
    return (dispatch) => {
        dispatch({
            type: REMOVE_PRODUCT_BASKET,
            payload: productId
        })
    }
}