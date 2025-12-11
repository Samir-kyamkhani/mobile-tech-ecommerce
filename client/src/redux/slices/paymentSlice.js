import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

const baseURL = import.meta.env.VITE_API_BASE_URL;

const initialState = {
  isProcessing: false,
  error: null,
  success: null,
  paymentData: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    paymentRequest: (state) => {
      state.isProcessing = true;
      state.error = null;
      state.success = null;
    },
    paymentSuccess: (state, action) => {
      state.isProcessing = false;
      state.paymentData = action.payload?.data || null;
      state.success = action.payload?.message || "Payment successful";
      state.error = null;
      if (action.payload?.showToast) {
        toast.success(state.success);
      }
    },
    paymentFail: (state, action) => {
      state.isProcessing = false;
      state.error = action.payload?.message || "Payment failed";
      state.paymentData = null;
      if (action.payload?.showToast !== false) {
        toast.error(state.error);
      }
    },
    resetPayment: (state) => {
      state.isProcessing = false;
      state.error = null;
      state.success = null;
      state.paymentData = null;
    },
  },
});

export const { paymentRequest, paymentSuccess, paymentFail, resetPayment } =
  paymentSlice.actions;

export default paymentSlice.reducer;

const handleError = (err) => {
  return err.response?.data?.message || err.message || "Something went wrong";
};

// ====== THUNKS ======

export const processOnlinePayment =
  ({ cart, amount, shipping, paymentResponse }) =>
  async (dispatch) => {
    dispatch(paymentRequest());

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${baseURL}/payment/success`,
        {
          cart,
          amount,
          shipping,
          paymentResponse,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      if (res.data.success) {
        dispatch(
          paymentSuccess({
            data: res.data.order,
            message: res.data.message || "Order placed successfully",
            showToast: true,
          })
        );

        return res.data;
      }

      throw new Error(res.data.message || "Order creation failed");
    } catch (error) {
      const errorMessage = handleError(error);
      dispatch(paymentFail({ message: errorMessage, showToast: true }));
      throw new Error(errorMessage);
    }
  };
