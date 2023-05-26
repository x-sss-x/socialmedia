import React from "react";
import { useAppDispatch } from "../../hooks";
import { incrementCart } from "../../store/cart.slice";
import Image from "next/image";
import { ApiResponse } from "../../store/product.slice";

export default function Product({image,price,title}:ApiResponse) {
  const dispatch = useAppDispatch();
  
  return (
    <div className="border-gray-200 w-48 p-5 flex flex-col space-y-4">
      <div>
        <img src={image} alt={title} width={400} height={400} className="object-fill"/>
      </div>
      <div>
        <h2>{title}</h2>
        <span>{price}</span>
      </div>
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
