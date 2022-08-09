import {ActionReducerMapBuilder, createSlice} from '@reduxjs/toolkit'
import { requestRentalRequest } from 'actions/admin';

interface AdminState{
  requestRental : Array<RequestRental>;   //대여 요청 정보

  requestRentalLoading:boolean;
  requestRentalDone:boolean;
  requestRentalError:null | string;
}

export const initialState: AdminState = {
  requestRental: [],

  requestRentalLoading: false,
  requestRentalDone: false,
  requestRentalError: null,
}

const adminSlice = createSlice({
  name:"admin",
  initialState,
  reducers:{},
  extraReducers: (builder: ActionReducerMapBuilder<AdminState>) => builder
    //대여 요청 정보 불러오기
    .addCase(requestRentalRequest.pending, (state) => {
      state.requestRentalLoading = true;
      state.requestRentalDone = false;
      state.requestRentalError = null;
    })
    .addCase(requestRentalRequest.fulfilled, (state, action) => {
      state.requestRentalLoading = false;
      state.requestRentalDone = true;
      
      state.requestRental = action.payload;
    })
    .addCase(requestRentalRequest.rejected, (state, action) => {
      state.requestRentalLoading = false;
      state.requestRentalError = action.payload ?? "무언가의 에러";
    })
})

export default adminSlice.reducer