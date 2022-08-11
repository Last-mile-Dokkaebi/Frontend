import {ActionReducerMapBuilder, createSlice} from '@reduxjs/toolkit'
import { driveRentalRequest, enrollScooterRequest, noneRentalRequest, rentalRentalRequest, waitRentalRequest } from 'actions/admin';

interface AdminState{
  noneRental : Array<RequestRental>;   //NONE 렌탈 정보
  waitRental : Array<RequestRental>;   //NONE 렌탈 정보
  rentalRental : Array<RequestRental>;   //NONE 렌탈 정보
  driveRental : Array<RequestRental>;   //NONE 렌탈 정보

  noneRentalLoading:boolean;
  noneRentalDone:boolean;
  noneRentalError:null | string;

  waitRentalLoading:boolean;
  waitRentalDone:boolean;
  waitRentalError:null | string;

  rentalRentalLoading:boolean;
  rentalRentalDone:boolean;
  rentalRentalError:null | string;

  driveRentalLoading:boolean;
  driveRentalDone:boolean;
  driveRentalError:null | string;
  

  enrollScooterLoading:boolean;
  enrollScooterDone:boolean;
  enrollScooterError:null | string;
}

export const initialState: AdminState = {
  noneRental: [],
  waitRental : [],  
  rentalRental : [],
  driveRental :[],

  noneRentalLoading: false,
  noneRentalDone: false,
  noneRentalError: null,

  waitRentalLoading: false,
  waitRentalDone: false,
  waitRentalError: null,

  rentalRentalLoading: false,
  rentalRentalDone: false,
  rentalRentalError: null,

  driveRentalLoading: false,
  driveRentalDone: false,
  driveRentalError: null,

  enrollScooterLoading: false,
  enrollScooterDone: false,
  enrollScooterError: null,
}

const adminSlice = createSlice({
  name:"admin",
  initialState,
  reducers:{},
  extraReducers: (builder: ActionReducerMapBuilder<AdminState>) => builder
    //NONE 렌탈 정보 불러오기
    .addCase(noneRentalRequest.pending, (state) => {
      state.noneRentalLoading = true;
      state.noneRentalDone = false;
      state.noneRentalError = null;
    })
    .addCase(noneRentalRequest.fulfilled, (state, action) => {
      state.noneRentalLoading = false;
      state.noneRentalDone = true;
      
      state.noneRental = action.payload;
    })
    .addCase(noneRentalRequest.rejected, (state, action) => {
      state.noneRentalLoading = false;
      state.noneRentalError = action.payload ?? "무언가의 에러";
    })

    //WAIT 렌탈 정보 불러오기
    .addCase(waitRentalRequest.pending, (state) => {
      state.waitRentalLoading = true;
      state.waitRentalDone = false;
      state.waitRentalError = null;
    })
    .addCase(waitRentalRequest.fulfilled, (state, action) => {
      state.waitRentalLoading = false;
      state.waitRentalDone = true;
      
      state.waitRental = action.payload;
    })
    .addCase(waitRentalRequest.rejected, (state, action) => {
      state.waitRentalLoading = false;
      state.waitRentalError = action.payload ?? "무언가의 에러";
    })

    //RENTAL 렌탈 정보 불러오기
    .addCase(rentalRentalRequest.pending, (state) => {
      state.rentalRentalLoading = true;
      state.rentalRentalDone = false;
      state.rentalRentalError = null;
    })
    .addCase(rentalRentalRequest.fulfilled, (state, action) => {
      state.rentalRentalLoading = false;
      state.rentalRentalDone = true;
      
      state.rentalRental = action.payload;
    })
    .addCase(rentalRentalRequest.rejected, (state, action) => {
      state.rentalRentalLoading = false;
      state.rentalRentalError = action.payload ?? "무언가의 에러";
    })

    //DRIVE 렌탈 정보 불러오기
    .addCase(driveRentalRequest.pending, (state) => {
      state.driveRentalLoading = true;
      state.driveRentalDone = false;
      state.driveRentalError = null;
    })
    .addCase(driveRentalRequest.fulfilled, (state, action) => {
      state.driveRentalLoading = false;
      state.driveRentalDone = true;
      
      state.driveRental = action.payload;
    })
    .addCase(driveRentalRequest.rejected, (state, action) => {
      state.driveRentalLoading = false;
      state.driveRentalError = action.payload ?? "무언가의 에러";
    })

    //스쿠터 등록 요청
    .addCase(enrollScooterRequest.pending, (state) => {
      state.enrollScooterLoading = true;
      state.enrollScooterDone = false;
      state.enrollScooterError = null;
    })
    .addCase(enrollScooterRequest.fulfilled, (state) => {
      state.enrollScooterLoading = false;
      state.enrollScooterDone = true;
    })
    .addCase(enrollScooterRequest.rejected, (state, action) => {
      state.enrollScooterLoading = false;
      state.enrollScooterError = action.payload ?? "무언가의 에러";
    })
})

export default adminSlice.reducer