import React from 'react';

//Added:
import { useSelector, useDispatch } from 'react-redux';
//Removed: import { useStoreContext } from '../../utils/GlobalState.js';
//Updated: import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions'; to:
import { removeFromCart, updateCartQuantity } from '../../utils/actions';

import { idbPromise } from "../../utils/helpers";

const CartItem = ({ item }) => {

  //Updated const [state, dispatch] = useStoreContext(); to the following 2 lines:
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  const removeItemFromCart = item => {

    //Updated: dispatch({ type: REMOVE_FROM_CART, _id: item._id }); to: 
    dispatch(removeFromCart(item._id, cart));
    idbPromise('cart', 'delete', { ...item });

  };

  const onChange = (e) => {
    const value = e.target.value;

    if (value === '0') {
      //Updated: dispatch({ type: REMOVE_FROM_CART, _id: item._id }); to:
      dispatch(removeFromCart(item._id, cart));
      idbPromise('cart', 'delete', { ...item });

    } else {

      //Updated: dispatch({ type: UPDATE_CART_QUANTITY, _id: item._id, purchaseQuantity: parseInt(value) }); to:
      dispatch(updateCartQuantity(item._id, parseInt(value)));
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });

    }
  };



  return (
    <div className="flex-row">
      <div>
        <img src={`/images/${item.image}`} alt="" />
      </div>
      <div>
        <div>{item.name}, ${item.price}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeItemFromCart(item)}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;