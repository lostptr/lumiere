import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import createDebugger from "redux-flipper";
import thunk from 'redux-thunk';
import note from './reducers/note';
import user from './reducers/user';

const store = configureStore({
  reducer: {
    note,
    user,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(thunk, createDebugger()),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
