import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { loginDataReducer } from "../features/auth/loginSlice";
import { signUpDataReducer } from "../features/auth/signUpSlice";
import { verificationDataReducer } from "../features/auth/verificationSlice";
import { bookingReducer } from "../features/booking/bookingSlice";

const store = configureStore({
  reducer: combineReducers({
    // auth module reducers
    loginDataReducer: loginDataReducer,
    signUpDataReducer: signUpDataReducer,
    verificationDataReducer: verificationDataReducer,
    bookingReducer: bookingReducer,
  }),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;