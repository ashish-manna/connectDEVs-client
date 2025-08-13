import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: [],
  reducers: {
    addRequest: (state, action) => action.payload,
    removeRequest: (state, action) => {
      const newList = state.filter((req) => req._id !== action.payload);
      return newList;
    },
    removeAllRequest: () => {
      return [];
    },
  },
});

export const { addRequest, removeRequest, removeAllRequest } =
  requestSlice.actions;
export default requestSlice.reducer;
