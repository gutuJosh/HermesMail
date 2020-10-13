import { ADD_PRODUCT_BASKET }  from '../actions/types';
import { REMOVE_PRODUCT_BASKET }  from '../actions/types';

const initialState = {
      basketNumbers : []
     
};

const products = [];

export default (state = initialState, action) => {
   switch(action.type){
        
       case ADD_PRODUCT_BASKET:
             products.push(action.payload);
             return {
                  basketNumbers : products
             }
           
       case REMOVE_PRODUCT_BASKET:
            let counter = 0;
            products.forEach(item => {
               if(item.id === action.payload){
                   products.splice(counter,1);
               }
               counter++;
            });
             return{
                basketNumbers : products
             }

       default:
        return state;

   }
};