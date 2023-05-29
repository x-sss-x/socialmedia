import React from "react";
import Cart from "./Cart";

export default function Header() {
  return (
    <div className="border-gray-300 border-b p-5 flex justify-between items-center">
      Header <Cart/>
    </div>
  );
}
