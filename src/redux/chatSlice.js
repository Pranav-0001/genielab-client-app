import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatId: "",
    assistantId: window?.assistant || "67e7f654e58fcc7f014fc5c2",
  },
  reducers: {
    setChatId: (state, action) => {
      state.chatId = action.payload.chatId;
    },
    setAssistantId: (state, action) => {
      state.assistantId = action.payload.assistantId;
    },
  },
});

export const { setChatId } = chatSlice.actions;

export default chatSlice.reducer;
