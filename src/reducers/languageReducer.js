import { CHANGE_LANGUAGE, GET_LANGUAGE }  from '../actions/types';

const initialState = {
    languageState : 'en'
     
};

export default (state = initialState, action) => {
   switch(action.type){
        
       case CHANGE_LANGUAGE:
             return {
                languageState : action.payload
             }

        case GET_LANGUAGE:
            return {
                languageState : state.languageState
            }  

       default:
        return state;

   }
};