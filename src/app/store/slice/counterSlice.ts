import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type StateProp = {
    value: number,
};

const initialValue: StateProp = { value: 0 };

const counterSlice = createSlice({
    name: "book",
    initialState: initialValue,
    reducers: {
        increment: (state) => {
            state.value++;
        },
        decrement: (state) => {
            state.value--;
        }



     },
});

export default counterSlice.reducer;
export const {increment , decrement } = counterSlice.actions;


// export const appSelector = (state:RootState) => state.appReducer;