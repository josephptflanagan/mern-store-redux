import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from '@apollo/react-hooks';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { idbPromise } from "../../utils/helpers";
import { QUERY_CHECKOUT } from "../../utils/queries"
import './style.css';

//Added:
import {useSelector, useDispatch} from 'react-redux';
//Removed: import { useStoreContext } from '../../utils/GlobalState.js';
//Updated: import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../utils/actions"; to:
import { toggleCart, addMultipleToCart } from "../../utils/actions";

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {

  //Updated const [state, dispatch] = useStoreContext(); to the following 2 lines:
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session })
      })
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch(addMultipleToCart([...cart]));
    };

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleTheCart() {
    //Updated: dispatch({ type: TOGGLE_CART }); to:
    dispatch(toggleCart());
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach(item => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const productIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds }
    });
  }

  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleTheCart}>
        <span
          role="img"
          aria-label="trash">🛒</span>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="close" onClick={toggleTheCart}>[close]</div>
      <h2>Shopping Cart</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map(item => <CartItem key={item._id} item={item} /> )}
          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>
            {
              Auth.loggedIn() ?
                <button onClick={submitCheckout}>
                  Checkout
                </button>
                :
                <span>(log in to check out)</span>
            }
          </div>
        </div>
      ) : (
          <h3>
            <span role="img" aria-label="shocked">
              😱
      </span>
      You haven't added anything to your cart yet!
          </h3>
        )}
    </div>
  );
};

export default Cart;