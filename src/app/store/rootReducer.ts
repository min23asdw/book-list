import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./slice/counterSlice";
import booksReducer from "./slice/booksSlice";

import tagsReducer from "./slice/tagSlice";
import highlightsReducer from "./slice/hightlightSlice";
import roomsReducer from "./slice/roomSlice";
import sidebarSlice from "./slice/sidebarSlice";

const rootReducer = combineReducers({
    counter: counterReducer,
    books: booksReducer,
    tags: tagsReducer,
    highlights : highlightsReducer,
    rooms :roomsReducer,
    sidebars:sidebarSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
