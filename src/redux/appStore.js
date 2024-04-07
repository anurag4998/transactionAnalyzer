import {configureStore} from '@reduxjs/toolkit';
import filterReducer from "../redux/filterSlice";
import transactionReducer from "../redux/transactionSlice";
const appStore = configureStore(
    {
        reducer : {
            filter: filterReducer,
            transactions: transactionReducer
        }
    })

export default appStore;