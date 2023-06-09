import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./counter.slice";
import {useSelector} from "react-redux"
import { cartSlice } from "./cart.slice";
import { productSlice } from "./product.slice";
import { commentsSlice } from "./comments.slice";

export const store = configureStore({
  reducer: {
    [counterSlice.name]: counterSlice.reducer,
    [cartSlice.name]: cartSlice.reducer,
    [productSlice.name]: productSlice.reducer,
    [commentsSlice.name]: commentsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector = useSelector<RootState>
