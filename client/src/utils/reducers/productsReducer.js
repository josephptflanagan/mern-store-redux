import { UPDATE_PRODUCTS } from '../../utils/types';

const productsReducer = (state = [], action) => {
    switch (action.type) {

        // if action type value is the value of `UPDATE_PRODUCTS`, return a new state object with an updated products array
        case UPDATE_PRODUCTS:
            return [...action.products];

        // if it's none of these actions, do not update state at all and keep things the same!
        default:
            return state;
    }
};

export default productsReducer;