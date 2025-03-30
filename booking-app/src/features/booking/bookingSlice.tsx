import { postApi } from "../../services/api";
import { apiEndPoints } from "../../config/path";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showError, showSuccess } from "../../helpers/messageHelper";

interface BookingState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  responseCode: number;
  responseData: any;
  bookingDetails: any;
}

interface BookingValues {
    customer_name: string;
    customer_email: string;
    booking_date: string;
    booking_time: string | null | undefined;
    booking_type: string;
    booking_slot: string | null | undefined;
    user_id: string;
}

interface BookingResponse {
  status: number;
  data: {
    data: any;
  };
}

const initialState: BookingState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  responseCode: 0,
  responseData: {},
  bookingDetails: null,
};

export const createBooking = createAsyncThunk<BookingResponse, BookingValues>(
  "/createBooking",
  async (values) => {
    try {
      const valuesData = { ...values };
      const payload = await postApi(apiEndPoints.BOOKING_PATH, valuesData);
      console.log("booking payload:::", payload);
      showSuccess(payload.data.message || "Booking successful");
      return payload;
    } catch (e: any) {
      showError(e.response.data.message || "Booking failed");
      throw e;
    }
  }
);

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBooking.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.responseCode = payload && payload.status;
        state.responseData = payload && payload.data.data;
      })
      .addCase(createBooking.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const bookingReducer = bookingSlice.reducer;
