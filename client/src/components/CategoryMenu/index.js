import React, { useEffect } from "react";
//Removed: import { useStoreContext } from '../../utils/GlobalState.js';
//Added: 
import {useSelector, useDispatch} from 'react-redux';
//updated: import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions'; to:
import {updateCategories, updateCurrentCategory} from '../../utils/actions.js'
import { useQuery } from '@apollo/react-hooks';
import { QUERY_CATEGORIES } from "../../utils/queries";

import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {

  //Updated const [state, dispatch] = useStoreContext(); to the following 2 lines:
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    // if categoryData exists or has changed from the response of useQuery, then run dispatch()
    if (categoryData) {

      // Replaced: dispatch({type: UPDATE_CATEGORIES,categories: categoryData.categories}); with:
      dispatch(updateCategories(categoryData.categories));
      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then(categories => {
        //Replaced: dispatch({type: UPDATE_CATEGORIES,categories: categories}); with:
        dispatch(updateCategories(categories));
      });
    }
  }, [categoryData, loading, dispatch]);
  const handleClick = id => {
    //Replaced: dispatch({type: UPDATE_CURRENT_CATEGORY, currentCategory: id}); with:
    dispatch(updateCurrentCategory(id));
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map(item => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
