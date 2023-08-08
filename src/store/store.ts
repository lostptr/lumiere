import { configureStore } from '@reduxjs/toolkit';
import note from './reducers/note';

const store = configureStore({
  reducer: {
    note
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
