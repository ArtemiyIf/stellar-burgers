import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import {
  useDispatch as dispatchHook,
  useSelector as selectorHook,
  TypedUseSelectorHook
} from 'react-redux';

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
