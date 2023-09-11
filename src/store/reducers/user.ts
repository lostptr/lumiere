import { CaseReducer, PayloadAction, SerializedError, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "@services/supabase";
import { ResourceStatus, User } from "src/types";


interface UserStore {
  user?: User,
  status: ResourceStatus,
  error?: SerializedError,
}

interface Credentials {
  email: string,
  password: string,
};

const initialState: UserStore = {
  status: 'idle',
}


export const fetchLoggedUser = createAsyncThunk(
  'user/fetchLoggedUser',
  async () => {
    const { data, error } = await authService.getUser()

    if (error) {
      return Promise.reject(error.message);
    }

    if (!data.session?.user) {
      return Promise.reject('No user found.');
    }

    return Promise.resolve(data.session.user);
  });

export const login = createAsyncThunk(
  'user/login',
  async (credentials: Credentials): Promise<User> => {
    const { data, error } = await authService.loginWithEmail(credentials.email, credentials.password);

    if (error) {
      return Promise.reject(error.message);
    }

    const user: User = {
      name: data?.user?.email ?? '',
      id: data?.user.id,
    }

    return Promise.resolve(user);
  });

export const logout = createAsyncThunk(
  'user/logout',
  async (): Promise<void> => {
    const { error } = await authService.logoutFromAuth();

    if (error) {
      return Promise.reject(error.message);
    }

    return Promise.resolve();
  });


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error;
      })
      .addCase(fetchLoggedUser.fulfilled, (state, action) => {
        state.status = 'succeded';
        state.user = {
          id: action.payload.id,
          name: action.payload.email ?? '',
        };
      })


      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeded';
        state.user = action.payload;
      })


      .addCase(logout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'succeded';
        state.user = undefined;
      })
  }
});

export const { } = userSlice.actions;
export default userSlice.reducer;
