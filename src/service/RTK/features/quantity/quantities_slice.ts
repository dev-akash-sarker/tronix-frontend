import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quantity: {
        count: 1,
        id: null
    },
    //  quantity: [] 
}

export const QuantitySlice = createSlice({
    name: "quantities",
    initialState,
    reducers: {
        increase_quantity: (state) => {
            state.quantity.count += 1;
        },
        decrease_quantity: (state) => {
            if (state.quantity.count > 1) {
                state.quantity.count -= 1;
            }
        },
        set_product: (state, action) => {
            state.quantity.id = action.payload;  // update selected product id
        }
    }
});

export const { increase_quantity, decrease_quantity, set_product } = QuantitySlice.actions;
export default QuantitySlice.reducer;
