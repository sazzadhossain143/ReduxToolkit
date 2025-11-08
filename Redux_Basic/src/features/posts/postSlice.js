import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async () => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts?_limit=10");
      return res.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: { 
    isloading: false,
    posts: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.isloading = false;
      state.posts = action.payload;
      state.error = null;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.isloading = false;
      state.posts = [];
      state.error = action.error.message;
    });
  },
});

export default postSlice.reducer;
