"use client";
import { Imprima } from "next/font/google";
import { useState } from "react";
import { useAppSelector } from "../../store";
import { useAppDispatch } from "../../hooks";
import { decrement, increment } from "../../store/counter.slice";
import Header from "@/components/Header";
import Main from "@/components/Main";

const imprima = Imprima({ weight: "400", subsets: ["latin"] });

export default function Page() {
  const count = useAppSelector((state) => state.counter) as number;
  const dispatch = useAppDispatch();

  return (
    <main className="w-full h-full overflow-hidden">
      {/* <h1 className="text-8xl font-bold" style={imprima.style}>
        Social Media
      </h1>
      <div className="gap-4 flex py-3">
        <button
          onClick={() => {
            dispatch(decrement());
          }}
          className="py-1 px-4 pb-2 active:bg-[rgba(255,255,255,0.5)] text-3xl font-bold border-white border-2 bg-white text-black hover:bg-transparent hover:text-white rounded-md"
        >
          -
        </button>
        <span className="text-4xl">{count}</span>
        <button
          onClick={() => {
            dispatch(increment());
          }}
          className="py-1 pb-2 px-3 flex active:bg-[rgba(255,255,255,0.5)] justify-center items-center text-3xl font-bold border-white border-2 bg-white text-black hover:bg-transparent hover:text-white rounded-md"
        >
          +
        </button>
      </div> */}

      <Header  />
      <Main />
    </main>
  );
}

/**
 *   Header
 *      Cart
 *         ...
 *  Main
 *   product
 *     ...
 */
