import React from "react";
import { useAppDispatch } from "../../hooks";
import { incrementCart } from "../../store/cart.slice";

export default function Product() {
  const dispatch = useAppDispatch();
  
  return (
    <div className="border-gray-200 w-48 p-5 flex flex-col space-y-4">
      <span>Product</span>
      <button
        onClick={() => {
          dispatch(incrementCart());
        }}
        className="border border-white text-white"
      >
        Add Cart
      </button>
    </div>
  );
}
