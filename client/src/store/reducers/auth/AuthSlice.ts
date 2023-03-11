import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../../models/IUser'
import { registerUser, loginUser, logoutUser, refreshUser } from './ActionCreators';

interface UserState {
  isAuth: boolean;
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  isAuth: false,
  isLoading: false,
  error: '',
}

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [registerUser.pending.type]: (state) => {
      state.isLoading = true
      state.error = ""
    },
    [registerUser.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false
      state.error = ""
      state.isAuth = true
    },
    [registerUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
      state.isAuth = false
    },
    [loginUser.pending.type]: (state) => {
      state.isLoading = true
      state.error = ""
    },
    [loginUser.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false
      state.error = ""
      state.isAuth = true
    },
    [loginUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
      state.isAuth = false
    },
    [logoutUser.pending.type]: (state) => {
      state.isLoading = true
      state.error = ""
    },
    [logoutUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false
      state.error = ""
      state.isAuth = false
    },
    [logoutUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
      state.isAuth = false
    },
    [refreshUser.pending.type]: (state) => {
      state.isLoading = true
      state.error = ""
      state.isAuth = false
    },
    [refreshUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false
      state.error = ""
      state.isAuth = true
    },
    [refreshUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
      state.isAuth = false
    },
  },
});

export const actionsReducer = authSlice.actions;
export default authSlice.reducer;