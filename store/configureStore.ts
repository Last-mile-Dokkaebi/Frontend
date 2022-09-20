import { configureStore, getDefaultMiddleware, isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import type { AnyAction } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from 'reducers';
import { useDispatch } from 'react-redux';
import { setErrorAction } from 'actions/system';

const isDev = process.env.NODE_ENV === 'development';

const errorAlert: Middleware = (api: MiddlewareAPI) => (next) => async (action: AnyAction) => {
  const isBrowser = typeof window === 'object';

  if (isRejectedWithValue(action)) {
    //서버 통신 중 에러 발생시
    if (isBrowser) {
      console.log(action);
    }
    console.log(`Rejected : ${action.type}`);
    const notAlert = ['user/myInfo/rejected']; //알림하지 않을 Action 설정
    if (!notAlert.includes(action.type)) {
      //알림하지 않을 Action이 아니면
      api.dispatch(
        setErrorAction(typeof action.payload === 'string' ? action.payload : '서버와의 통신 중 에러가 발생하였습니다'),
      ); //에러메시지를 설정
    }
  }
  return next(action);
};

const middleware = getDefaultMiddleware().concat(errorAlert);

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: isDev,
});

const createStore = () => {
  // if(isDev){
  //   middleware.push(logger)
  // }
  return store;
};

const wrapper = createWrapper(createStore, {
  // debug: isDev,
  debug: false,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export default wrapper;
