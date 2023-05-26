import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProductList = createAsyncThunk<
  ApiResponse,
  void,
  {
    rejectValue: {
      msg: string;
    };
  }
>(
  "/product/fetchProduct",
  async (_payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      return fulfillWithValue(data);
    } catch (e) {
      return rejectWithValue({ msg: "Something went wrong !" });
    }
  }
);

export interface ApiResponse {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface InitialStateProps {
  isLoading: boolean;
  error: null | string | undefined;
  data: null | ApiResponse;
}

const initialState: InitialStateProps = {
  data: null,
  isLoading: false,
  error: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductList.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(fetchProductList.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchProductList.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload?.msg;
    });
  },
});
