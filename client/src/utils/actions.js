//used by the ProductList component, with this we can add offline capabilities and persist our product data
export const UPDATE_PRODUCTS = "UPDATE_PRODUCTS";
//Creates a list of categories from the server to allow for the addition of offline capabilities.
export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";
//Allows for the selection of a category from the UPDATE_CATEGORIES list
export const UPDATE_CURRENT_CATEGORY = "UPDATE_CURRENT_CATEGORY";
export const ADD_TO_CART = 'ADD_TO_CART';
export const ADD_MULTIPLE_TO_CART = 'ADD_MULTIPLE_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_QUANTITY = 'UPDATE_CART_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';
export const TOGGLE_CART = 'TOGGLE_CART';