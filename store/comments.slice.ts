import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SupaClient } from "../utils/supabase";

export const fetchIntialComments = createAsyncThunk<
  any,
  void,
  {
    rejectValue: {
      msg: string;
    };
  }
>(
  "/comments/fetchIntialComments",
  async (_payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await SupaClient.from("comments")
        .select("*,users(username)")
        .limit(10).order("created_at",{
          ascending:false
        });
      const data = response.data;
      return fulfillWithValue(data);
    } catch (e) {
      return rejectWithValue({ msg: "Something went wrong !" });
    }
  }
);

export const postComment = createAsyncThunk<
  any,
  {
    id: string;
    content: string;
  },
  {
    rejectValue: {
      msg: string;
    };
  }
>(
  "/comments/postComment",
  async (payload, { fulfillWithValue, rejectWithValue,dispatch }) => {
    try {
      const response = await SupaClient.from("comments")
        .insert({
          content: payload.content,
          usersId: payload.id,
        })
        .select("*,users(username)")
        .single();
      const data = response.data;
      dispatch(fetchIntialComments());
      return fulfillWithValue(data);
    } catch (e) {
      return rejectWithValue({ msg: "Something went wrong !" });
    }
  }
);

interface InitialStateProps {
  isLoading: boolean;
  error: null | string | undefined;
  data: any[];
  isPosting: boolean;
}

const initialState: InitialStateProps = {
  data: [],
  isLoading: false,
  error: null,
  isPosting: false,
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIntialComments.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(fetchIntialComments.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchIntialComments.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload?.msg;
    });

    builder.addCase(postComment.fulfilled, (state, { payload }) => {
      state.isPosting = false;
      state.error = null;
    });
    builder.addCase(postComment.pending, (state) => {
      state.isPosting = true;
      state.error = null;
    });
    builder.addCase(postComment.rejected, (state, { payload }) => {
      state.isPosting = false;
      state.error = payload?.msg;
    });
  },
});
