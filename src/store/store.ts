import { configureStore } from '@reduxjs/toolkit';
import note from './reducers/note';
import user from './reducers/user';

const store = configureStore({
  reducer: {
    note,
    user,
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
