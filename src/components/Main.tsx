import React from "react";
import Product from "./Product";

export default function Main() {
  return (
    <div className="h-full w-full p-5">
      <h1>Products</h1>
      <div className="flex">
      <Product />
      <Product />
      <Product />
      <Product/>
      <Product/>
      </div>
    </div>
  );
}
