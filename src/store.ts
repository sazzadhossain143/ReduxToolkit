import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/products/productSlice";

const store = configureStore({
  reducer: {
    productsR : productSlice,
  },
});

export default store;