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
            const updatedArr = [...state.transactionData]
            const index = state.transactionData.findIndex(item => item.transactionId === transactionId);
            if (index !== -1) {
                state.transactionData[index] = { ...state.transactionData[index], transactionTag: transactionTag };
            }
        }
        
    }
})

export const {updateTransactions,updateFilteredTransactionData,updateTransaction} = transactionSlice.actions;
export default transactionSlice.reducer;