// Store/configureStore.js

//import { createStore } from 'redux';
//import toggleFavorite from './Reducers/FavoritesReducers';
//import { persistStore, persistReducer } from 'redux-persist';
//export default createStore(toggleFavorite);


import { AsyncStorage } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';
import { createStore,combineReducers } from 'redux';
import toggleFavorite from './Reducers/FavoritesReducers';


const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}


const persistedReducer = persistReducer(persistConfig, toggleFavorite);
const store = createStore(persistedReducer);
let persistor = persistStore(store);

export {store, persistor}