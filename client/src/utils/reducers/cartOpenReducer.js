import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART
} from '../types';

const cartOpenReducer = (state = false, action) => {
    switch (action.type) {
        //Add a new item to the cart? open
        case ADD_TO_CART:
            return true;

        //Remove the last of an item from the cart? close it, otherwise ? leave it open
        case REMOVE_FROM_CART:
            let newState = action.cart.filter((product) => {
                return product._id !== action._id;
            });

            return newState.length > 0;

        //change the quantity of an item in the cart? open
        case UPDATE_CART_QUANTITY:
            return true;

        //Cart Empty? Close it
        case CLEAR_CART:
            return false;

        //Cart Open/Closed? close it/open it
        case TOGGLE_CART:
            return !state;

        //Nothing Changed? don't change anything
        default:
            return state;
    }
};

//exporting the reducer
export default cartOpenReducer;