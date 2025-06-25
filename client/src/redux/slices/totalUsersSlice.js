import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.withCredentials = true;

const initialState = {
  users: [],
  isLoading: false,
  error: null,
  success: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = null;
    },
    userSuccess: (state, action) => {
      state.isLoading = false;
      state.users = action.payload || [];
      state.success = "Success";
      state.error = null;
      if (action.payload?.showToast) {
        toast.success(state.success);
      }
    },
    userFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error(action.payload);
    },
  },
});

export const { userRequest, userSuccess, userFail } = userSlice.actions;

export default userSlice.reducer;

const handleError = (err) =>
  err.response?.data?.message || err.message || "Something went wrong.";

const baseURL = import.meta.env.VITE_API_BASE_URL;

// ==== THUNKS ====

export const getAllUsers = () => async (dispatch) => {
  dispatch(userRequest());
  try {
    const res = await axios.get(`${baseURL}/auth/get-users`);

    dispatch(
      userSuccess({
        data: res.data.data,
        message: "Fetched users successfully",
        showToast: false,
      })
    );
  } catch (error) {
    dispatch(userFail(handleError(error)));
  }
};
