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
    }from './types';

    export const updateProducts = (products) => {
        return{
            type: UPDATE_PRODUCTS,
            products
        };
    };

    export const updateCategories = (categories) => {
        return{
            type: UPDATE_CATEGORIES,
            categories
        };
    };
    export const updateCurrentCategory = (id) => {
        return{
            type: UPDATE_CURRENT_CATEGORY,
            currentCategory: id
        };
    };

    export const addToCart = (product) => {
        return{
            type: ADD_TO_CART,
            product: product
        };
    };

    export const addMultipleToCart = (products) => {
        return{
            type: ADD_MULTIPLE_TO_CART,
            products
        };
    };

    export const removeFromCart = (id, cart) => {
        return{
            type: REMOVE_FROM_CART,
            _id: id,
            cart
        };
    };

    export const updateCartQuantity = (id, purchaseQuantity) => {
        return{
            type: UPDATE_CART_QUANTITY,
            _id: id,
            purchaseQuantity
        };
    };

    export const clearCart = (id) => {
        return{
            type: CLEAR_CART,
            _id: id
        };
    };

    export const toggleCart = () => {
        return{
            type: TOGGLE_CART,
        };
    };