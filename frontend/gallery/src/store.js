import {configureStore} from "@reduxjs/toolkit"
// the below import updates the state in userReducer,hence it can be given any name!
import userReducer from './compnents/redux/reducers/userReducer'
import imageReducer from "./compnents/redux/reducers/imageReducer"
import {persistStore,persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig = {
    key : "persist-key",
    storage
}

const persistedUser = persistReducer(persistConfig,userReducer)
const persistedImage = persistReducer(persistConfig,imageReducer)


const store  = configureStore({
    reducer:{
        // user:userReducer,
        // image:imageReducer  
        user:persistedUser,
        image:persistedImage 
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    
})
const persistor = persistStore(store)
export default store
export {persistor}