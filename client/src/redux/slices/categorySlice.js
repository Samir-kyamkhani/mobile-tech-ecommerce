import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

const baseURL = import.meta.env.VITE_API_BASE_URL;

const initialState = {
  categories: [],
  isLoading: false,
  error: null,
  success: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    categoryRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = null;
    },
    categorySuccess: (state, action) => {
      state.isLoading = false;
      state.categories = action.payload?.data || state.categories;
      state.success = action.payload?.message || "Success";
      state.error = null;

      if (action.payload?.showToast) {
        toast.success(state.success);
      }
    },

    categoryFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error(action.payload);
    },
  },
});

export const { categoryRequest, categorySuccess, categoryFail } =
  categorySlice.actions;

export default categorySlice.reducer;

// ====== UTIL ======
const handleError = (err) => {
  return err.response?.data?.message || err.message || "Something went wrong";
};

// ====== THUNKS ======

export const createCategory = (categoryData) => async (dispatch) => {
  dispatch(categoryRequest());
  try {
    const res = await axios.post(
      `${baseURL}/category/create-category`,
      categoryData
    );

    dispatch(
      categorySuccess({
        data: res.data.data.categories,
        message: "Category created successfully",
        showToast: true,
      })
    );
  } catch (error) {
    dispatch(categoryFail(handleError(error)));
  }
};

export const getAllCategories = () => async (dispatch) => {
  dispatch(categoryRequest());
  try {
    const res = await axios.get(`${baseURL}/category/get-categories`);

    dispatch(
      categorySuccess({
        data: res.data.data.categories,
        message: "Fetched categories successfully",
        showToast: false,
      })
    );
  } catch (error) {
    dispatch(categoryFail(handleError(error)));
  }
};

export const updateCategory =
  ({ id, updatedData }) =>
  async (dispatch) => {
    dispatch(categoryRequest());
    try {
      const res = await axios.put(
        `${baseURL}/category/update-category/${id}`,
        updatedData
      );
      dispatch(
        categorySuccess({
          data: res.data.data.categories,
          message: "Category updated successfully",
          showToast: true,
        })
      );
    } catch (error) {
      dispatch(categoryFail(handleError(error)));
    }
  };

export const deleteCategory = (id) => async (dispatch) => {
  dispatch(categoryRequest());
  try {
    await axios.delete(`${baseURL}/category/delete-category/${id}`);
    dispatch(
      categorySuccess({
        message: "Category deleted successfully",
        showToast: true,
      })
    );
  } catch (error) {
    dispatch(categoryFail(handleError(error)));
  }
};
