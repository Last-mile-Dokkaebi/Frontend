import {configureStore, combineReducers, getDefaultMiddleware} from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {createWrapper, HYDRATE} from 'next-redux-wrapper'

import userReducer from 'stores/user'
import systemReducer from 'stores/system'
import bikeReducer from 'stores/bike'

//Persist 옵션 정의
const persistConfig={
  key: "root",
  version: 1,
  storage,
}

/*
  Reducer 합치기
  HYDRATE는 SSR이라서 적용해야 됨
*/

const rootReducer = (state:any, action:any) => {
  if(action.type === HYDRATE){
    return{
      ...state,
      ...action.paylod,
    }
  }
  // reducer가 생성될때마다 여기에다가 추가 될 것
  return combineReducers({
    user: userReducer,
    system: systemReducer,
    bike: bikeReducer,
  })(state, action)
}
 

const persistedReducer = persistReducer(persistConfig, rootReducer)

/*
  store 정의
  middleware부분은 자세히 이해 못했음
*/
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck:{
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }),
})

// _app.tsx에서 persist를 위해서 사용됨
export const persistor = persistStore(store);

const createStore = () => store;

//wrapper 보내 준 것은 _app.tsx에서 사용됨
const wrapper = createWrapper(createStore)
export default wrapper

//useSelector사용할 때 state의 타입을 이걸로 해줘야 됨
export type RootState = ReturnType<typeof rootReducer>;