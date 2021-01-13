import { SET_USER_INFO, GET_USER_INFO }  from '../actions/types';

const initialState = {
    userState : {
        name : '',
        avatar: '',
        email: '',
        login: false
    }
     
};

export default (state = initialState, action) => {
   switch(action.type){
        
       case SET_USER_INFO:
             return {
                userState : action.payload
             }

        case GET_USER_INFO:
            return {
                userState : state.userState
            }  

       default:
        return state;

   }
};