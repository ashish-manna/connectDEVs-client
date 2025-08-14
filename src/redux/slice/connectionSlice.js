import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: null,
  reducers: {
    addConnection: (state, action) => action.payload,
    updateConnection: (state, action) => {
      const newList = [...state, ...action.payload];
      return newList;
    },
    removeAllConnection: () => {
      return null;
    },
  },
});

export const { addConnection, removeAllConnection, updateConnection } =
  connectionSlice.actions;
export default connectionSlice.reducer;
