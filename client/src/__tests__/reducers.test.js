//A reducer is a function that updates state by returning a new state object
// and never alters the original state object. Now, that doesn't mean the data
// inside the state object isn't altered. Of course, it is—why else would we
// need to update state? The key takeaway here is that state is intended to
// be immutable, meaning it never should be directly altered in any way.
// The reason for this is that it goes behind the state management system's
// back and it isn't informed that something has changed. 

// import our reducers
import { reducer } from '../utils/reducers';

// import our actions
import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART
} from '../utils/actions';

// create a sample of what our global state will look like
const initialState = {
    products: [], //New state created with UPDATE_PRODUCTS
    categories: [{ name: 'Food' }], //New state created with UPDATE_CATEGORIES
    currentCategory: '1',//New state created with UPDATE_CURRENT_CATEGORY
    cart: [
        {
            _id: '1',
            name: 'Soup',
            purchaseQuantity: 1
        },
        {
            _id: '2',
            name: 'Bread',
            purchaseQuantity: 2
        }
    ],
    cartOpen: false
};

//A Reducer accepts 2 parameters, the current state object, the action being 
// performed to update the state.
//The action is composed of two parts: type,the type of action being performed, 
// and value, the new data we want to use with the action

//Creates a new state object 2 empty objects in length, tests to be sure
// it's two objects in length, while ensuring the original object is unchanged
test('UPDATE_PRODUCTS', () => {
    let newState = reducer(initialState, {
        type: UPDATE_PRODUCTS,
        products: [{}, {}]
    });

    expect(newState.products.length).toBe(2);
    expect(initialState.products.length).toBe(0);
});

//Creates a new state object 2 empty objects in length, tests to be sure
// it's two objects in length, while ensuring the original object is unchanged
test('UPDATE_CATEGORIES', () => {
    let newState = reducer(initialState, {
        type: UPDATE_CATEGORIES,
        categories: [{}, {}]
    });

    expect(newState.categories.length).toBe(2);
    expect(initialState.categories.length).toBe(1);
});

//Creates a new state object with a currentCategory of 2, tests to be sure
// it's 2, while ensuring the original object's currentCategory is unchanged
test('UPDATE_CURRENT_CATEGORY', () => {
    let newState = reducer(initialState, {
        type: UPDATE_CURRENT_CATEGORY,
        currentCategory: '2'
    });

    expect(newState.currentCategory).toBe('2');
    expect(initialState.currentCategory).toBe('1');
});

test('ADD_TO_CART', () => {
    let newState = reducer(initialState, {
        type: ADD_TO_CART,
        product: { purchaseQuantity: 1 }
    });

    expect(newState.cart.length).toBe(3);
    expect(initialState.cart.length).toBe(2);
});

test('ADD_MULTIPLE_TO_CART', () => {
    let newState = reducer(initialState, {
        type: ADD_MULTIPLE_TO_CART,
        products: [{}, {}]
    });

    expect(newState.cart.length).toBe(4);
    expect(initialState.cart.length).toBe(2);
});

test('REMOVE_FROM_CART', () => {
    let newState1 = reducer(initialState, {
        type: REMOVE_FROM_CART,
        _id: '1'
    });

    // cart is still open
    expect(newState1.cartOpen).toBe(true);

    // the second item should now be the first
    expect(newState1.cart.length).toBe(1);
    expect(newState1.cart[0]._id).toBe('2');

    let newState2 = reducer(newState1, {
        type: REMOVE_FROM_CART,
        _id: '2'
    });

    // cart is empty and closed
    expect(newState2.cartOpen).toBe(false);
    expect(newState2.cart.length).toBe(0);

    expect(initialState.cart.length).toBe(2);
});

test('UPDATE_CART_QUANTITY', () => {
    let newState = reducer(initialState, {
        type: UPDATE_CART_QUANTITY,
        _id: '1',
        purchaseQuantity: 3
    });

    expect(newState.cartOpen).toBe(true);
    expect(newState.cart[0].purchaseQuantity).toBe(3);
    expect(newState.cart[1].purchaseQuantity).toBe(2);

    expect(initialState.cartOpen).toBe(false);
});

test('CLEAR_CART', () => {
    let newState = reducer(initialState, {
        type: CLEAR_CART
    });

    expect(newState.cartOpen).toBe(false);
    expect(newState.cart.length).toBe(0);
    expect(initialState.cart.length).toBe(2);
});

test('TOGGLE_CART', () => {
    let newState = reducer(initialState, {
        type: TOGGLE_CART
    });

    expect(newState.cartOpen).toBe(true);
    expect(initialState.cartOpen).toBe(false);

    let newState2 = reducer(newState, {
        type: TOGGLE_CART
    });

    expect(newState2.cartOpen).toBe(false);
});