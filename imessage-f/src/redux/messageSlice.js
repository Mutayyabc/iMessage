import { createSlice } from "@reduxjs/toolkit";

export const roomSlice = createSlice({
  name: "room",
  initialState: {
    messageId: null,
    roomName: null,
  },
  reducers: {
    setRooms: (state, action) => {
      state.messageId = action.payload.messageId;
      state.roomName = action.payload.roomName;
    },
  },
});

export const { setRooms } = roomSlice.actions;

export const selectRoomName = (state) => state.message.roomName;
export const selectMessageId = (state) => state.message.messageId;

export default roomSlice.reducer;