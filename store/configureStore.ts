import {configureStore, getDefaultMiddleware, isAsyncThunkAction, isPending, isRejectedWithValue, Middleware, MiddlewareAPI} from '@reduxjs/toolkit'
import type { AnyAction } from '@reduxjs/toolkit';
import {createWrapper} from 'next-redux-wrapper'
import rootReducer from 'reducers'
import { useDispatch } from 'react-redux';
import { setErrorAction } from 'actions/system';

const isDev = process.env.NODE_ENV === "development";

const errorAlert: Middleware = (api: MiddlewareAPI) => (next) => (action: AnyAction) => {
  if(isRejectedWithValue(action)){  //서버 통신 중 에러 발생시
    if(typeof action.payload === "string"){
      api.dispatch(setErrorAction(action.payload)); //에러메시지를 설정
    }
    else{
      api.dispatch(setErrorAction("서버와의 통신 중 에러가 발생하였습니다")); //에러메시지를 설정
    }
  }
  return next(action)
}

const middleware = getDefaultMiddleware().concat(errorAlert);

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: isDev,
})

const createStore = () => {
  // if(isDev){
  //   middleware.push(logger)
  // }
  return store;
}

const wrapper = createWrapper(createStore, {
  // debug: isDev,
  debug: false
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export default wrapper;