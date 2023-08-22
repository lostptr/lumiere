import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "src/types";

interface UserStore {
  user?: User,
}

const initialState: UserStore = {
  user: undefined,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = { ...action.payload };
    },
    logout: (state) => {
      state.user = undefined;
    },
  }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;