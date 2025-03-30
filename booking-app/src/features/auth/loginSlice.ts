// src/features/auth/loginSlice.js
import { authPostApi } from "../../services/api";
import { apiEndPoints } from "../../config/path";
import { showError } from "../../helpers/messageHelper";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface LoginState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  responseCode: number;
  responseData: any;
  token: string;
}

interface LoginValues {
  email: string;
  password: string;
}

interface LoginResponse {
  status: number;
  data: {
    data: any;
  };
}

const initialState: LoginState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  responseCode: 0,
  responseData: {},
  token: "",
};

export const loginData = createAsyncThunk<LoginResponse, LoginValues>(
  "/loginData",
  async (values) => {
    try {
      const valuesData = { ...values };
      const payload = await authPostApi(apiEndPoints.LOGIN_PATH, valuesData);
      console.log("payload:::", payload);
      return payload;
    } catch (e: any) {
      showError(e.response.data.message || "Login failed");
      throw e;
    }
  }
);

export const loginDataSlice = createSlice({
  name: "loginData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.responseCode = payload && payload.status;
        state.responseData = payload && payload.data.data;
      })
      .addCase(loginData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
  },
});

export const loginDataReducer = loginDataSlice.reducer;