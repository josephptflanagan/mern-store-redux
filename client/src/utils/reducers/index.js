//Removing useReducer
//import { useReducer } from 'react';

//Added:
import { combineReducers } from 'redux';

//split the reducers to make them easier to manage
import cartOpenReducer from './cartOpenReducer';
import cartReducer from './cartReducer';
import categoriesReducer from './categoriesReducer';
import currentCategoryReducer from './currentCategoryReducer';
import productsReducer from './productsReducer';

//combining the split reducers
export const reducer = combineReducers({
    cart: cartReducer,
    cartOpen: cartOpenReducer,
    categories: categoriesReducer,
    currentCategory: currentCategoryReducer,
    products: productsReducer   
});

export default reducer;
