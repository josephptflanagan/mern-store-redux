//createContext will be used to instantiate a new Context object. The more meaningful
// term we can use here is that we're using it to create the container to hold our
// global state data and functionality so we can provide it throughout our app.

//useContext is another React Hook that will allow us to use the state created 
// from the createContext function.
import React, { createContext, useContext } from "react";
import { useProductReducer } from './reducers';

//instantiate the global state object
const StoreContext = createContext();

//Every Context Object has to components, a Provider and a Consumer.

//The Provider is a special type of React component that we wrap our application
// in so it can make the state data that's passed into it as a prop available to
// all other components.
const { Provider } = StoreContext;

//the Consumer is our means of grabbing and using the data that the Provider holds for us.

//With all of the contents of StoreProvider in place, the StoreProvider function isn't as
// much of a function as it is our own custom <Provider> component
const StoreProvider = ({ value = [], ...props }) => {
    //The value prop is good to have included, as it opens us up to pass in more data for
    // state if we need to. We don't actually need to in this app, but it makes this
    // provider flexible.The other prop, or rather ...props, is in place to handle any 
    // other props the user may need. 
    const [state, dispatch] = useProductReducer({
        products: [],
        cart: [],
        cartOpen: false,
        categories: [],
        currentCategory: ''
      });
    // use this to confirm it works!
    //console.log(state);
    //Because that wraps it around the useReducer() Hook from React, every time we run
    // this useProductReducer() function, we receive the following two items in return:

    //state: the most up-to-date version of our global state object.

    //dispatch: the method we execute to update our state. It is specifically going
    // to look for an action object passed in as its argument, as we'll soon see.
    return <Provider value={[state, dispatch]} {...props} />;
  };

  // This is a custom react hook, that when executed, will provide [state, dispatch]
  // from the StoreProvider.
  const useStoreContext = () => {
    return useContext(StoreContext);
  };

  export { StoreProvider, useStoreContext };