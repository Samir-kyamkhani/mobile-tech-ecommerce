import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

const baseURL = import.meta.env.VITE_API_BASE_URL;

const initialState = {
  products: [],
  isLoading: false,
  error: null,
  success: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = null;
    },
    productSuccess: (state, action) => {
      state.isLoading = false;
      state.products = action.payload?.data || [];
      state.success = action.payload?.message || "Success";
      state.error = null;
      if (action.payload?.showToast) {
        toast.success(state.success);
      }
    },
    productFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error(action.payload);
    },
  },
});

export const { productRequest, productSuccess, productFail } =
  productSlice.actions;

export default productSlice.reducer;

const handleError = (err) => {
  return err.response?.data?.message || err.message || "Something went wrong";
};

// ====== THUNKS ======

export const createProduct = (productData) => async (dispatch) => {
  dispatch(productRequest());
  try {
    const res = await axios.post(
      `${baseURL}/product/create-product`,
      productData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(res.data.data.product);
    

    dispatch(
      productSuccess({
        data: [res.data.data.product],
        message: "Product created successfully",
        showToast: true,
      })
    );
  } catch (error) {
    dispatch(productFail(handleError(error)));
  }
};

export const getAllProducts = () => async (dispatch) => {
  dispatch(productRequest());
  try {
    const res = await axios.get(`${baseURL}/product/get-products`);
    dispatch(
      productSuccess({
        data: res.data.data.products,
        message: "Fetched products successfully",
        showToast: false,
      })
    );
  } catch (error) {
    dispatch(productFail(handleError(error)));
  }
};

export const getSingleProduct = (id) => async (dispatch) => {
  dispatch(productRequest());
  try {
    const res = await axios.get(`${baseURL}/product/get-product/${id}`);

    dispatch(
      productSuccess({
        data: [res.data.data.product],
        message: "Fetched product successfully",
        showToast: false,
      })
    );
  } catch (error) {
    dispatch(productFail(handleError(error)));
  }
};

export const updateProduct =
  ({ id, updatedData }) =>
  async (dispatch) => {
    dispatch(productRequest());
    try {
      const res = await axios.put(
        `${baseURL}/product/update-product/${id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(
        productSuccess({
          data: res.data.data.products,
          message: "Product updated successfully",
          showToast: true,
        })
      );
    } catch (error) {
      dispatch(productFail(handleError(error)));
    }
  };

export const deleteProduct = (id) => async (dispatch) => {
  dispatch(productRequest());
  try {
    await axios.delete(`${baseURL}/product/delete-product/${id}`);
    dispatch(
      productSuccess({
        message: "Product deleted successfully",
        showToast: true,
      })
    );
  } catch (error) {
    dispatch(productFail(handleError(error)));
  }
};
