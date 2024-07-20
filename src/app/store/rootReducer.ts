import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./slice/counterSlice";
import booksReducer from "./slice/booksSlice";

import tagReducer from "./slice/tagSlice";

const rootReducer = combineReducers({
    counter: counterReducer,
    books: booksReducer,
    tags: tagReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
