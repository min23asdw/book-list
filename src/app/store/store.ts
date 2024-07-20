import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";


// import appReducer from "./counterSlice";

import rootReducer from "./rootReducer";

export const store = configureStore({
    reducer:  rootReducer ,
});


// create and export typed-hooks in file
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();



 

 