import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const DB_URL = "http://localhost:4000/Products";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const res = await axios.get(DB_URL);
      return res.data;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
);
export const deleteProducts = createAsyncThunk(
  "products/deleteProducts",
  async (id) => {
    try {
      const res = await axios.delete(`${DB_URL}/${id}`);
      return res.data.id;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
);
export const addProducts = createAsyncThunk(
  "products/addProducts",
  async (product:any) => {
    try {
      const res = await axios.post(`${DB_URL}`, product);
      return res.data;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
);
export const updateProducts = createAsyncThunk(
  "products/updateProducts",
  async ({product, id}:any) => {
    try {
      const res = await axios.put(`${DB_URL}/${id}`, product);
      console.log("Updated product response:", res.data);
      return res.data;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
);

interface ProductsState {
  isloading: boolean;
  products: any[];
  error: string | null;
}

const initialState: ProductsState = {
  isloading: false,
  products: [],
  error: null,
};

const productslice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isloading = false;
      state.products = action.payload;
      state.error = null;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isloading = false;
      state.products = [];
      state.error = action.error.message ?? null;
    });
    builder.addCase(deleteProducts.fulfilled, (state, action) => {
      state.products = state.products.filter((product) => product.id !== action.payload);
    });
    builder.addCase(addProducts.fulfilled, (state, action) => {
      state.products.push(action.payload);
    });
    builder.addCase(updateProducts.fulfilled, (state, action) => {
      const index = state.products.findIndex((product) => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    });
  },
});

export default productslice.reducer;
