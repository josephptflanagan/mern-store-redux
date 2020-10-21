import {
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
} from '../../utils/types';

const cartReducer = (state = [], action) => {
    switch (action.type) {

        //if adding one, update state
        case ADD_TO_CART:
            return [...state, action.product];

        //if adding multiple, update state
        case ADD_MULTIPLE_TO_CART:
            return [...state, ...action.products];

        //if the product is removed from the cart, update state
        case REMOVE_FROM_CART:
            let newState = action.cart.filter((product) => {
                return product._id !== action._id;
            });

            return newState;

        //if the product quantity is increased, update state
        case UPDATE_CART_QUANTITY:
            return state.map((product) => {
                if (action._id === product._id) {
                    product.purchaseQuantity = action.purchaseQuantity;
                }
                return product;
            });

        //empty set
        case CLEAR_CART:
            return [];

        // if it's none of these actions, do not update state at all and keep things the same!
        default:
            return state;
    }
};

export default cartReducer;