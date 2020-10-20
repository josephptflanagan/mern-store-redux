//A reducer is a function that updates state by returning a new state object
// and never alters the original state object. Now, that doesn't mean the data
// inside the state object isn't altered. Of course, it is—why else would we
// need to update state? The key takeaway here is that state is intended to
// be immutable, meaning it never should be directly altered in any way.
// The reason for this is that it goes behind the state management system's
// back and it isn't informed that something has changed. 

//The useState() Hook is great for managing simpler amounts of state, like form field values and the status of a button
// being clicked. The useReducer() Hook is meant specifically for managing a greater level of state, like we're doing now. 
import { useReducer } from 'react';

import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART
} from './actions';

export const reducer = (state, action) => {
    switch (action.type) {
        // if action type value is the value of `UPDATE_PRODUCTS`, return a new state object with an updated products array
        case UPDATE_PRODUCTS:
            return {
                ...state,
                products: [...action.products],
            };
        // if action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
        case UPDATE_CATEGORIES:
            return {
                ...state,
                categories: [...action.categories]
            };
        // if action type value is the value of `UPDATE_CURRENT_CATEGORY`, return a new state object with an updated currentCategory
        case UPDATE_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.currentCategory
            };
        case ADD_TO_CART:
            return {
                ...state,
                cartOpen: true,
                cart: [...state.cart, action.product]
            };
        case ADD_MULTIPLE_TO_CART:
            return {
                ...state,
                cart: [...state.cart, ...action.products]
            };
        case REMOVE_FROM_CART:
            let newState = state.cart.filter(product => {
                return product._id !== action._id;
            });

            return {
                ...state,
                cartOpen: newState.length > 0,
                cart: newState
            };
        case UPDATE_CART_QUANTITY:
            return {
                ...state,
                cartOpen: true,
                cart: state.cart.map(product => {
                    if (action._id === product._id) {
                        product.purchaseQuantity = action.purchaseQuantity;
                    }
                    return product;
                })
            };
        case CLEAR_CART:
            return {
                ...state,
                cartOpen: false,
                cart: []
            };
        case TOGGLE_CART:
            return {
                ...state,
                cartOpen: !state.cartOpen
            };

        // if it's none of these actions, do not update state at all and keep things the same!
        default:
            return state;
    }
};

export function useProductReducer(initialState) {
    return useReducer(reducer, initialState);
}