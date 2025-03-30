import { authPostApi } from "../../services/api";
import { apiEndPoints } from "../../config/path";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showError, showSuccess } from "../../helpers/messageHelper";

interface VerificationState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  responseCode: number;
  responseData: any;
  token: string;
}

interface VerificationValues {
  email: string;
  otp: string;
}

interface VerificationResponse {
  status: number;
  data: {
    data: any;
    message: string;
  };
}

const initialState: VerificationState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  responseCode: 0,
  responseData: {},
  token: "",
};

export const verificationData = createAsyncThunk<VerificationResponse, VerificationValues>(
  "/verificationData",
  async (values) => {
    try {
      const valuesData = { ...values };
      const payload = await authPostApi(apiEndPoints.VERIFICATION_PATH, valuesData);
      console.log("payload:::", payload);
      showSuccess(payload.data.message || "Verification successful!");
      return payload;
    } catch (e: any) {
      showError(e.response?.data?.message || "Verification failed");
      throw e;
    }
  }
);

export const verificationDataSlice = createSlice({
  name: "verificationData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verificationData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(verificationData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.responseCode = payload && payload.status;
        state.responseData = payload && payload.data.data;
      })
      .addCase(verificationData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const verificationDataReducer = verificationDataSlice.reducer;
