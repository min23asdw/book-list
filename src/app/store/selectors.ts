import { RootState } from "./store";


export const selectTags = (state: RootState) => state.tags;
export const selectRooms = (state: RootState) => state.rooms;
export const selectSidebars = (state: RootState) => state.sidebars;

export const selectHightlight = (state: RootState) => state.highlights;
export const selectCounter = (state: RootState) => state.counter;
export const selectBooks = (state: RootState) => state.books;
