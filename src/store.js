import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};
const middleWares = [thunk];

const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middleWares)
        )
    );

export default store;