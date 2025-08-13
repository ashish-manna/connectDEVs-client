import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: null,
  reducers: {
    addConnection: (state, action) => action.payload,
    removeAllConnection: () => {
      return null;
    },
  },
});

export const { addConnection, removeAllConnection } = connectionSlice.actions;
export default connectionSlice.reducer;
