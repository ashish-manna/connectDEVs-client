import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload,
    removeFeed: (state, action) => {
      const newFeed = state.filter((feed) => feed._id !== action.payload);
      return newFeed;
    },
    removeAllFeed: () => {
      return null;
    },
  },
});

export const { addFeed, removeFeed, removeAllFeed } = feedSlice.actions;
export default feedSlice.reducer;
