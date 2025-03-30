import { authPostApi } from "../../services/api";
import { apiEndPoints } from "../../config/path";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showError, showSuccess } from "../../helpers/messageHelper";

interface SignUpState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  responseCode: number;
  responseData: any;
  token: string;
}

interface SignUpValues {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

interface SignUpResponse {
  status: number;
  data: {
    data: any;
  };
}

const initialState: SignUpState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  responseCode: 0,
  responseData: {},
  token: "",
};

export const signUpData = createAsyncThunk<SignUpResponse, SignUpValues>(
  "/signUpData",
  async (values) => {
    try {
      const valuesData = { ...values };
      const payload = await authPostApi(apiEndPoints.SIGN_UP_PATH, valuesData);
      console.log("payload:::", payload);
      showSuccess(payload.data.message || "Sign up successful!");
      return payload;
    } catch (e: any) {
        showError(e.response?.data?.message || "Sign up failed");
      throw e;
    }
  }
);

export const signUpDataSlice = createSlice({
  name: "signUpData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.responseCode = payload && payload.status;
        state.responseData = payload && payload.data.data;
      })
      .addCase(signUpData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const signUpDataReducer = signUpDataSlice.reducer;
