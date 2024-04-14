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
        },
        updateTransactionById : (state,action) => {
            const transactionId = action.payload.transactionId;
            const transactionTag = action.payload.transactionTag;
            const updatedArr = [...state.transactionData]
            const index = state.transactionData.findIndex(item => item.transactionId === transactionId);
            if (index !== -1) {
                state.transactionData[index] = { ...state.transactionData[index], transactionTag: transactionTag };
            }
        },
        updateTransactionByName : (state,action) => {
            const recipientName = action.payload.recipientName;
            const transactionTag = action.payload.transactionTag;
            const indexArray = state.transactionData.map((item,index) => {
                if(item.recipient.toLowerCase() === recipientName.toLowerCase()) {
                    return index;
                }
                else {
                    return null;
                }
            });
            indexArray.forEach(function(index) {
                    if(index) {
                        state.transactionData[index] = { ...state.transactionData[index], transactionTag: transactionTag}
                    }
                }
            );
            
        }
        
    }
})

export const {updateTransactions,updateFilteredTransactionData,updateTransactionById, updateTransactionByName} = transactionSlice.actions;
export default transactionSlice.reducer;