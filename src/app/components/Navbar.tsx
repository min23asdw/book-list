"use client";
import React from "react";
import { useSelector } from "react-redux";
import { selectBooks, selectCounter } from "../store/selectors";
// import { appSelector } from "../store/counterSlice";
// import { selectCounter, selectBooks } from "./selectors";
type Props = {};

export default function Navbar({}: Props) {
    const counter = useSelector(selectCounter);
    const books = useSelector(selectBooks);
  return <div>counter from Navbar component :{counter.value}</div>;
}
