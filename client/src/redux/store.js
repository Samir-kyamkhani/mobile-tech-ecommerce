import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import customerReducer from "./slices/customerSlice.js";
import categoryReducer from "./slices/categorySlice.js";
import productReducer from "./slices/productSlice.js";
import orderReducer from "./slices/orderSlice.js";
import userReducer from "./slices/totalUsersSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    category: categoryReducer,
    product: productReducer,
    order: orderReducer,
    user: userReducer,
  },
});
