import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

const initialState = {
  customer: [],
  isLoading: false,
  error: null,
  success: false,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    customerRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = null;
    },
    customerSuccess: (state, action) => {
      state.isLoading = false;
      state.customer = action.payload?.data || state.customer;
      state.success = action.payload?.message || "Success";
      state.error = null;
      if (action.payload?.showToast) {
        toast.success(state.success);
      }
    },

    customerFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error(action.payload);
    },
  },
});

export const { customerRequest, customerSuccess, customerFail } =
  customerSlice.actions;

export default customerSlice.reducer;

const handleError = (err) =>
  err.response?.data?.message || err.message || "Something went wrong";

const baseURL = import.meta.env.VITE_API_BASE_URL;

// ==== THUNKS ====

export const createCustomer = (customerData) => async (dispatch, getState) => {
  dispatch(customerRequest());
  try {
    const { data } = await axios.post(
      `${baseURL}/customer/create-customer`,
      customerData
    );

    const currentList = getState().customer.customer;

    dispatch(
      customerSuccess({
        data: [...currentList, data.data.user],
        message: "Customer created successfully",
        showToast: true,
      })
    );
  } catch (error) {
    dispatch(customerFail(handleError(error)));
  }
};

export const getAllCustomers = () => async (dispatch) => {
  dispatch(customerRequest());
  try {
    const { data } = await axios.get(`${baseURL}/customer/get-customers`);
    dispatch(
      customerSuccess({
        data: data.data,
        message: "Customers fatched successfully",
        showToast: false,
      })
    );
  } catch (error) {
    dispatch(customerFail(handleError(error)));
  }
};

export const updateCustomer =
  ({ id, updatedData }) =>
  async (dispatch) => {
    dispatch(customerRequest());
    try {
      await axios.put(`${baseURL}/customer/update-customer/${id}`, updatedData);
      dispatch(
        customerSuccess({
          message: "Customer updated successfully",
          showToast: true,
        })
      );
    } catch (error) {
      dispatch(customerFail(handleError(error)));
    }
  };

export const deleteCustomer = (id) => async (dispatch) => {
  dispatch(customerRequest());
  try {
    await axios.delete(`${baseURL}/customer/delete-customer/${id}`);
    dispatch(
      customerSuccess({
        message: "Customer delete successfully",
        showToast: true,
      })
    );
  } catch (error) {
    dispatch(customerFail(handleError(error)));
  }
};
