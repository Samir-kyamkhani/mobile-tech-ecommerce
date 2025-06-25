import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

const baseURL = import.meta.env.VITE_API_BASE_URL;

const initialState = {
  orders: [],
  isLoading: false,
  error: null,
  success: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    orderRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = null;
    },
    orderSuccess: (state, action) => {
      state.isLoading = false;
      state.orders = action.payload?.data || [];
      state.success = action.payload?.message || "Success";
      state.error = null;
      if (action.payload?.showToast) {
        toast.success(state.success);
      }
    },
    orderFail: (state, action) => {
      state.isLoading = false;

      toast.error(action.payload);
      if (action.payload?.showToast !== false) {
        toast.error(state.error);
      }
    },
  },
});

export const { orderRequest, orderSuccess, orderFail } = orderSlice.actions;

export default orderSlice.reducer;

const handleError = (err) => {
  return err.response?.data?.message || err.message || "Something went wrong";
};

// ====== THUNKS ======

export const createOrder = (order) => async (dispatch) => {
  dispatch(orderRequest());
  try {
    const res = await axios.post(`${baseURL}/order/create-order`, order);
    dispatch(
      orderSuccess({
        data: [res.data.data],
        message: "Order placed successfully",
        showToast: true,
      })
    );
  } catch (error) {
    dispatch(orderFail({ message: handleError(error), showToast: true }));
  }
};

export const getAllOrders = () => async (dispatch) => {
  dispatch(orderRequest());
  try {
    const res = await axios.get(`${baseURL}/order/get-orders`);

    dispatch(
      orderSuccess({
        data: res.data.data,
        message: "Fetched orders successfully",
        showToast: false,
      })
    );
  } catch (error) {
   dispatch(orderFail({ message: handleError(error), showToast: false }));
  }
};
export const updateOrder =
  ({ id, updatedData }) =>
  async (dispatch) => {
    dispatch(orderRequest());
    try {
      const res = await axios.put(
        `${baseURL}/order/update-order/${id}`,
        updatedData
      );
      dispatch(
        orderSuccess({
          data: [res.data.data],
          message: "Order updated successfully",
          showToast: true,
        })
      );
    } catch (error) {
     dispatch(orderFail({ message: handleError(error), showToast: false }));
    }
  };

export const deleteOrder = (id) => async (dispatch) => {
  dispatch(orderRequest());
  try {
    await axios.delete(`${baseURL}/order/delete-order/${id}`);
    dispatch(
      orderSuccess({
        message: "order deleted successfully",
        showToast: true,
      })
    );
  } catch (error) {
   dispatch(orderFail({ message: handleError(error), showToast: false }));
  }
};
