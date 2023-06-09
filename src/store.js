import {configureStore} from '@reduxjs/toolkit';
import userSlice from './features/userSlice';
import appApi from './services/appApi';

// presist our store
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

// reducers

const reducer = combineReducers({
    user:userSlice,
    [appApi.reducerPath]:appApi.reducer,
});
const presistConfig = {
    key:'root',
    storage,
    blackList:[appApi.reducerPath],
};

const persistedReducer = persistReducer(presistConfig , reducer);

const store = configureStore({
    reducer:persistedReducer,
    middleware: [thunk , appApi.middleware]
});

export default store;