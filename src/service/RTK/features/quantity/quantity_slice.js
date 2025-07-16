import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quantity: {
        count: 1,
        id: null
    },
}

export const QuantitySlice = createSlice({
    name: "quantites",
    initialState: initialState,
    reducers: {
        increase_quantity: (state, action){
         const existingItem = state.
        },
      
    }
})