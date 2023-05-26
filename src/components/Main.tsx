import React, { useEffect } from "react";
import { useState, useCallback } from "react";
import Product from "./Product";
import { useAppDispatch } from "../../hooks";
import { ApiResponse, fetchProductList } from "../../store/product.slice";
import { useAppSelector } from "../../store";

export default function Main() {
  const products = useAppSelector(
    (state) => state.product.data
  ) as ApiResponse[];
  const isLoading = useAppSelector(
    (state) => state.product.isLoading
  ) as boolean;
  const dispatch = useAppDispatch();
  // //outcoming result
  // const [products, setProducts] = useState<ApiResponse[]>([]);

  // //function to fetch products from api
  // const fetchProductsList = useCallback(async () => {
  //   const response = await fetch("https://fakestoreapi.com/products");
  //   const data = await response.json();
  //   setProducts(data);
  // }, []);

  // //trigger the fuction when page loads
  // useEffect(() => {
  //   fetchProductsList();
  // }, []);
  
  useEffect(() => {
    dispatch(fetchProductList());
  }, [dispatch]);

  if (isLoading)
    return (
      <div className="h-full w-full flex justify-center items-center text-3xl">
        Loading products...
      </div>
    );

  return (
    <div className="h-full w-full p-5 overflow-y-scroll">
      <h1>Products</h1>
      <div className="flex flex-wrap justify-between">
        {products &&
          products.map((product) => (
            <Product
              id={product.id}
              image={product.image}
              price={product.price}
              title={product.title}
              key={product.id}
            />
          ))}
      </div>
    </div>
  );
}
