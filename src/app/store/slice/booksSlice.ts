import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Book = {
    id: number;
    title: string;
};

type BooksState = {
    books: Book[],
};

const initialBooksState: BooksState = { books: [] };

const booksSlice = createSlice({
    name: "books",
    initialState: initialBooksState,
    reducers: {
        addBook: (state, action: PayloadAction<Book>) => {
            state.books.push(action.payload);
        },
        removeBook: (state, action: PayloadAction<number>) => {
            state.books = state.books.filter(book => book.id !== action.payload);
        },
    },
});

export const { addBook, removeBook } = booksSlice.actions;
export default booksSlice.reducer;
