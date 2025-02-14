"use client";
import Image from "next/image";
import { store } from "./store/store";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { selectBooks, selectCounter } from "./store/selectors";
import { addBook, removeBook } from "./store/slice/booksSlice";
import { decrement, increment } from "./store/slice/counterSlice";
import { useEffect, useState } from "react";
import TagList from "./components/TagList";
import HighlightList from "./components/HighlightList";
import RoomList from "./components/RoomList";
import Sidebar from "./components/Sidebar";

export default function Home() {
  const dispatch = useDispatch();
  const counter = useSelector(selectCounter);
  const books = useSelector(selectBooks);
  // const tags = useSelector(selectTags);

  const handleAddBook = () => {
    const newBook = { id: books.books.length + 1, title: "New Book" };
    dispatch(addBook(newBook));
  };

  const handleRemoveBook = (id: number) => {
    dispatch(removeBook(id));
  };

  return (
    <main>
      <div className="flex min-h-screen flex-col">
        {/* <h1>Counter: {counter.value}</h1>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>

        <h2>Books</h2>
        <button onClick={handleAddBook}>Add Book</button>
        <ul>
          {books.books.map((book) => (
            <li key={book.id}>
              {book.title}
              <button onClick={() => handleRemoveBook(book.id)}>Remove</button>
            </li>
          ))}
        </ul> */}
        <RoomList />
        <div className="  items-center justify-between p-2 xl:p-12">
          <TagList />
          <HighlightList />
          <Sidebar />
        </div>
      </div>
    </main>
  );
}
