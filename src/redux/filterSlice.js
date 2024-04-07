import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: "Filter",
    initialState : {
        filterApplied : "currentMonth",
        fromDate : null,
        toDate : null
    },
    reducers : {
        changeFilter : (state, action) => {
            if(action.payload.type === 'customDate') {
                state.filterApplied = action.payload.type;
                state.fromDate = action.payload.fromDate;
                state.toDate = action.payload.toDate;
            }
            state.filterApplied = action.payload.type;

        }
    }
})

export const {changeFilter} = filterSlice.actions;
export default filterSlice.reducer;