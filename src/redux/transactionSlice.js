import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
    name: "Transactions",
    initialState : {
       transactionData : [],
    },
    reducers : {
        updateTransactions : (state, action) => {
            state.transactionData = [...state.transactionData, ...action.payload];
        },
        updateFilteredTransactionData : (state, action) => {
            state.filteredTransactionData.length = 0;
            state.filteredTransactionData = [...state.filteredTransactionData, ...action.payload];
        },
        updateTransaction : (state,action) => {
            const transactionId = action.payload.transactionId;
            const transactionTag = action.payload.transactionTag;  
            const transaction = state.transactionData.filter(transaction => transaction.transactionId === transactionId);
            transaction['transactionTag'] = transactionTag;
            const unfilteredTransactions = state.transactionData.filter(transaction =>  transaction.transactionId !== transactionId);
            state.transactionData = [...unfilteredTransactions,transaction];
        }
        
    }
})

export const {updateTransactions,updateFilteredTransactionData,updateTransaction} = transactionSlice.actions;
export default transactionSlice.reducer;