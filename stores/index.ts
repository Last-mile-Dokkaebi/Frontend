import { Action, configureStore, EnhancedStore, ThunkAction } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers, Store } from "redux";
import { createWrapper, HYDRATE, MakeStore } from "next-redux-wrapper";

import logger from "redux-logger";

import userReducer from "stores/user";
import systemReducer from "stores/system";
import bikeReducer from "stores/bike"

//https://velog.io/@baemki/Next.js-redux-toolkit-redux-wrapper-redux-persist-%EC%84%B8%ED%8C%85

const persistConfig = {
    key: "root",
    version: 1,
    storage
};

const rootReducer = combineReducers({ 
  user: userReducer, 
  system: systemReducer, 
  bike: bikeReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }),
    devTools: process.env.NODE_ENV !== "production"
});

const setupStore = (context: any): EnhancedStore => store;

const makeStore: MakeStore<any> = (context: any) => setupStore(context);

export const persistor = persistStore(store);

const wrapper = createWrapper<Store>(makeStore);
export default wrapper;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

// import {configureStore, combineReducers, getDefaultMiddleware} from '@reduxjs/toolkit'
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER
// } from 'redux-persist'
// import logger from "redux-logger";
// import storage from 'redux-persist/lib/storage'
// import {createWrapper, HYDRATE} from 'next-redux-wrapper'

// import userReducer from 'stores/user'
// import systemReducer from 'stores/system'
// import bikeReducer from 'stores/bike'

// //Persist 옵션 정의
// const persistConfig={
//   key: "root",
//   version: 1,
//   storage,
// }

// /*
//   Reducer 합치기
//   HYDRATE는 SSR이라서 적용해야 됨
// */

// const rootReducer = (state:any, action:any) => {
//   switch(action.type){
//     case HYDRATE:
//       return action.payload;
//     default:{
//       const combinedReducer = combineReducers({
//         user: userReducer,
//         system: systemReducer,
//         bike: bikeReducer,
//       })

//       return combinedReducer(state, action);
//     }
//   }
//   // if(action.type === HYDRATE){
//   //   return{
//   //     ...state,
//   //     ...action.paylod,
//   //   }
//   // }
//   // // reducer가 생성될때마다 여기에다가 추가 될 것
//   // return combineReducers({
//   //   user: userReducer,
//   //   system: systemReducer,
//   //   bike: bikeReducer,
//   // })(state, action)
// }
 

// const persistedReducer = persistReducer(persistConfig, rootReducer)

// /*
//   store 정의
//   middleware부분은 자세히 이해 못했음
// */
// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) => 
//     getDefaultMiddleware({
//       serializableCheck:{
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
//       }
//     }).concat(logger),
// })



// // _app.tsx에서 persist를 위해서 사용됨
// export const persistor = persistStore(store);

// const createStore = () => store;

// //wrapper 보내 준 것은 _app.tsx에서 사용됨
// const wrapper = createWrapper(createStore, {
//   debug: process.env.NODE_ENV !== "production"
// })
// export default wrapper

// //useSelector사용할 때 state의 타입을 이걸로 해줘야 됨
// export type RootState = ReturnType<typeof rootReducer>;