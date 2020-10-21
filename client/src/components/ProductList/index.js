import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

//Added:
import {useSelector, useDispatch} from 'react-redux';

//Removed: import { useStoreContext } from '../../utils/GlobalState.js';
//Updated: import { UPDATE_PRODUCTS } from '../../utils/actions'; to: 
import { updateProducts } from '../../utils/actions';

import { idbPromise } from "../../utils/helpers";

import ProductItem from "../ProductItem";
import { QUERY_PRODUCTS } from "../../utils/queries";
import spinner from "../../assets/spinner.gif"

function ProductList() {


  //Updated const [state, dispatch] = useStoreContext(); to the following 2 lines:
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const { currentCategory } = state;
  
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {

      //Updated: dispatch({ type: UPDATE_PRODUCTS, products: data.products }); to:
      dispatch(updateProducts(data.products));

      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {

      idbPromise('products', 'get').then((products) => {

        //Updated:  dispatch({ type: UPDATE_PRODUCTS, products: products }); to:
        dispatch(updateProducts(data.products));
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(product => product.category._id === currentCategory);
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {state.products.length ? (
        <div className="flex-row">
            {filterProducts().map(product => (
                <ProductItem
                  key= {product._id}
                  _id={product._id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  quantity={product.quantity}
                />
            ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      { loading ? 
      <img src={spinner} alt="loading" />: null}
    </div>
  );
}

export default ProductList;
