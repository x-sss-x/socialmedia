import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./counter.slice";
import {useSelector} from "react-redux"
import { cartSlice } from "./cart.slice";

export const store = configureStore({
  reducer: {
    [counterSlice.name]: counterSlice.reducer,
    [cartSlice.name]: cartSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector = useSelector<RootState>
