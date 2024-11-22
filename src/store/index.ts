import {configureStore} from "@reduxjs/toolkit";
import customersReducer from "./slices/customersSlice";
import invoicesReducer from "./slices/invoicesSlice";
import productsReducer from "./slices/productsSlice";

export const store = configureStore({
  reducer: {
    invoices: invoicesReducer,
    products: productsReducer,
    customers: customersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
