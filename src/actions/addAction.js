import { ADD_PRODUCT_BASKET, REMOVE_PRODUCT_BASKET, CHANGE_LANGUAGE, GET_LANGUAGE } from './types.js';
import { SET_USER_INFO, GET_USER_INFO , SET_LAYOUT_CONFIG, GET_LAYOUT_CONFIG } from './types.js';

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

export const getLanguage = () => {
    return (dispatch) => {
        dispatch({
            type: GET_LANGUAGE,
        })
    }
}

export const changeLanguage = (lang) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_LANGUAGE,
            payload: lang
        })
    }
}


export const setUserInfo = (data) => {
    return (dispatch) => {
        dispatch({
            type: SET_USER_INFO,
            payload: data
        })
    }
}

export const getUserInfo = () => {
    return (dispatch) => {
        dispatch({
            type: GET_USER_INFO
        })
    }
}

export const setLayoutConfig = (data) => {
    return (dispatch) => {
        dispatch({
            type: SET_LAYOUT_CONFIG,
            payload: data
        })
    }
}

export const getLayoutConfig = () => {
    return (dispatch) => {
        dispatch({
            type: GET_LAYOUT_CONFIG
        })
    }
}


