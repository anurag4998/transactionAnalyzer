import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
    name: "Transactions",
    initialState : {
       transactionData : [],
       filteredTransactionData : []
    },
    reducers : {
        updateTransactions : (state, action) => {
            state.transactionData = [...state.transactionData, ...action.payload];
        },
        updateFilteredTransactionData : (state, action) => {
            state.filteredTransactionData.length = 0;
            state.filteredTransactionData = [...state.filteredTransactionData, ...action.payload];
        }
        
    }
})

export const {updateTransactions,updateFilteredTransactionData} = transactionSlice.actions;
export default transactionSlice.reducer;