import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatId: "",
  },
  reducers: {
    setChatId: (state, action) => {
      state.chatId = action.payload.chatId;
    },
  },
});

export const { setChatId } = chatSlice.actions;

export default chatSlice.reducer;
