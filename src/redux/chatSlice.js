import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatId: "",
    assistantId: "",
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

export const { setChatId,setAssistantId } = chatSlice.actions;

export default chatSlice.reducer;
