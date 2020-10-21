import { UPDATE_CURRENT_CATEGORY } from '../../utils/types';

const currentCategoryReducer = (state = '', action) => {
    switch (action.type) {
       
        // if action type value is the value of `UPDATE_CURRENT_CATEGORY`, return a new state object with an updated currentCategory
        case UPDATE_CURRENT_CATEGORY:
            return action.currentCategory;

        // if there's nothing to update, do not update state at all and keep things the same!
        default:
            return state;
    }
};

export default currentCategoryReducer;