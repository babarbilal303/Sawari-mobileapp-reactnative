import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';
import { userReducer, CarModalReducer, CarModalVisiableEdit, CarModalVisiableAdd,CarDetailsForEdit } from "../Redux/Reducer";
import AsyncStorage from '@react-native-community/async-storage';
const reducers = combineReducers({
    user: userReducer,
    CarModal: CarModalReducer,
    CarModalVisiableAdd: CarModalVisiableAdd,
    CarModalVisiableEdit: CarModalVisiableEdit,
    CarDetailsForEdit:CarDetailsForEdit,
})
const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}
const persistedReducer = persistReducer(persistConfig, reducers)
const store = createStore(
    persistedReducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);
let persistor = persistStore(store);
export { store, persistor };
