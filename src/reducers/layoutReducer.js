import { SET_LAYOUT_CONFIG, GET_LAYOUT_CONFIG }  from '../actions/types';
import Store from '../helpers/Storage';


const initialState = {
    layoutState : Store.getLocal('layout') !== false ? JSON.parse(Store.getLocal('layout')) :  {
        currentPage : '',
        appContainer: '',
        appSidebar: {}
    }
     
};

export default (state = initialState, action) => { 
    
   switch(action.type){
        
       case SET_LAYOUT_CONFIG:
            
            Store.setLocal('layout', JSON.stringify(action.payload));
             return {
                layoutState : action.payload
             }

        case GET_LAYOUT_CONFIG:
           
            return {
                layoutState : state.layoutState
            }  

       default:
        return state;

   }
};