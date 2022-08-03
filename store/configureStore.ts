import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import {createWrapper} from 'next-redux-wrapper'
import logger from 'redux-logger'
import rootReducer from 'reducers'
import { useDispatch } from 'react-redux';

const isDev = process.env.NODE_ENV === "development";

const middleware = getDefaultMiddleware();
const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: isDev,
})

const createStore = () => {
  if(isDev){
    middleware.push(logger)
  }
  return store;
}

const wrapper = createWrapper(createStore, {
  debug: isDev,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export default wrapper;