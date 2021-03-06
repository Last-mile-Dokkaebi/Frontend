import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import userReducer from './user'
import bikeReducer from './bike'
import systemReducer from './system'

const rootReducer = (state:any, action:any) => {
  switch(action.type){
    case HYDRATE:
      return {...state, ...action.payload};
    default:{
      const combinedReducer = combineReducers({
        user: userReducer,
        bike: bikeReducer,
        system: systemReducer,
      })
      return combinedReducer(state, action)
    }
  }
}

export default rootReducer;