//Renamed from GlobalState.js to store.js

// replaced import React, { createContext, useContext } from "react" with:
import { createStore } from 'redux';

//replaced import { useProductReducer } from './reducers' with:
import reducer from './reducers';

/* replaced this:
const StoreContext = createContext();

const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useProductReducer({
        products: [],
        cart: [],
        cartOpen: false,
        categories: [],
        currentCategory: ''
      });

    return <Provider value={[state, dispatch]} {...props} />;
  };

  const useStoreContext = () => {
    return useContext(StoreContext);
  };

  export { StoreProvider, useStoreContext };
  with this: */
const store = createStore(reducer)
export default store;