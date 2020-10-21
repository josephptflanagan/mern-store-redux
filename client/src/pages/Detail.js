import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';

//Added:
import { useSelector, useDispatch } from 'react-redux';

import { idbPromise } from "../utils/helpers";

//Removed: import { useStoreContext } from '../../utils/GlobalState.js';
//Replaced: import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY, ADD_TO_CART, UPDATE_PRODUCTS } from '../utils/actions'; with:
import { removeFromCart, updateCartQuantity, addToCart, updateProducts } from '../utils/actions.js';

import { QUERY_PRODUCTS } from "../utils/queries";
import spinner from '../assets/spinner.gif'

import Cart from '../components/Cart';

function Detail() {

  //Updated const [state, dispatch] = useStoreContext(); to the following 2 lines:
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({})

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = state;

  const addItemToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id)

    if (itemInCart) {

      //Updated: dispatch({ type: UPDATE_CART_QUANTITY, _id: id, purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1 }); to: 
      dispatch(updateCartQuantity(id, (parseInt(itemInCart.purchaseQuantity) + 1)))
      idbPromise('cart', 'put', { ...itemInCart, purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1 });

    } else {

      //Updated: dispatch({ type: ADD_TO_CART, product: { ...currentProduct, purchaseQuantity: 1 } }); to: 
      dispatch(addToCart({...currentProduct, purchaseQuantity: 1}))
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });

    }
  };

  const removeItemFromCart = () => {

    //Updated: dispatch({ type: REMOVE_FROM_CART, _id: currentProduct._id }); to:
    dispatch(removeFromCart(currentProduct._id, cart))
    idbPromise('cart', 'delete', { ...currentProduct });

  };

  useEffect(() => {

    if (products.length) {

      setCurrentProduct(products.find(product => product._id === id));

    } else if (data) {
      //Updated: dispatch({type: UPDATE_PRODUCTS, products: data.products}); to:
      dispatch(updateProducts(data.products));
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        //Updated: dispatch({ type: UPDATE_PRODUCTS, products: indexedProducts }); to:
        dispatch(updateProducts(data.products))
      });
    }
  }, [products, data, loading, dispatch, id]);

  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">
            ← Back to Products
          </Link>

          <h2>{currentProduct.name}</h2>

          <p>
            {currentProduct.description}
          </p>

          <p>
            <strong>Price:</strong>
            ${currentProduct.price}
            {" "}
            <button onClick={addItemToCart}>Add to cart</button>
            <button
              disabled={!cart.find(p => p._id === currentProduct._id)}
              onClick={removeItemFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {
        loading ? <img src={spinner} alt="loading" /> : null
      }
      <Cart />
    </>
  );
};

export default Detail;
