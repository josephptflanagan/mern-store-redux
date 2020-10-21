import { UPDATE_CATEGORIES } from '../../utils/types';

const categoriesReducer = (state = [], action) => {
    switch (action.type) {
        //if a category is added, update the state (create a new state object with the updated value and return it as state is immutable)
        case UPDATE_CATEGORIES:
            return [...action.categories];

        default:
            return state;
    }
};

export default categoriesReducer;